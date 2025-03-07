
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Domain, User, Video } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useVideos = (selectedDomains: Domain[]) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['videos', selectedDomains],
    queryFn: async () => {
      let query = supabase.from('videos').select(`
        *,
        author:profiles(id, name, username, avatar)
      `);

      if (selectedDomains.length > 0) {
        query = query.in('domain', selectedDomains);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error fetching videos',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return data.map((video) => ({
        id: video.id,
        title: video.title,
        author: video.author,
        videoUrl: video.video_url,
        thumbnail: video.thumbnail,
        likes: video.likes,
        comments: video.comments,
        shares: video.shares,
        domain: video.domain as Domain,
        description: video.description,
        trending: video.trending,
      })) as Video[];
    },
  });
};

export const useUserProfile = (userId: string) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        toast({
          title: 'Error fetching profile',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return {
        id: data.id,
        name: data.name,
        username: data.username,
        avatar: data.avatar,
        bio: data.bio,
        followersCount: data.followers_count,
        followingCount: data.following_count,
        selectedDomains: data.selected_domains as Domain[],
      } as User;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (profile: Partial<User> & { id: string }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          username: profile.username,
          bio: profile.bio,
          avatar: profile.avatar,
          selected_domains: profile.selectedDomains,
        })
        .eq('id', profile.id);

      if (error) {
        toast({
          title: 'Error updating profile',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile', variables.id] });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
    },
  });
};

export const useLikeVideo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ videoId, userId }: { videoId: string; userId: string }) => {
      // First check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('video_id', videoId)
        .eq('user_id', userId)
        .single();

      if (existingLike) {
        // Unlike
        const { error: deleteError } = await supabase
          .from('likes')
          .delete()
          .eq('id', existingLike.id);

        if (deleteError) throw deleteError;

        // Decrement like count
        const { error: updateError } = await supabase.rpc('decrement_likes', {
          video_id: videoId,
        });

        if (updateError) throw updateError;

        return { action: 'unliked' };
      } else {
        // Like
        const { error: insertError } = await supabase
          .from('likes')
          .insert({ user_id: userId, video_id: videoId });

        if (insertError) throw insertError;

        // Increment like count
        const { error: updateError } = await supabase.rpc('increment_likes', {
          video_id: videoId,
        });

        if (updateError) throw updateError;

        return { action: 'liked' };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to like/unlike video',
        variant: 'destructive',
      });
    },
  });
};

export const useUserLikes = (userId: string) => {
  return useQuery({
    queryKey: ['user-likes', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('video_id')
        .eq('user_id', userId);

      if (error) throw error;
      return data.map(like => like.video_id);
    },
    enabled: !!userId,
  });
};
