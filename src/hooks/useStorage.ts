
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

export const useUploadFile = (bucket: string) => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) {
        toast({
          title: 'Upload failed',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    },
    onError: (error) => {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload file',
        variant: 'destructive',
      });
    },
  });
};

export const useUploadVideo = () => {
  return useUploadFile('videos');
};

export const useUploadImage = () => {
  return useUploadFile('images');
};
