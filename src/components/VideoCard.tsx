
import { useRef, useState, useEffect } from "react";
import { Video } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Share2, ChevronUp, Volume2, VolumeX } from "lucide-react";
import Button from "./Button";
import { useLikeVideo, useUserLikes } from "@/hooks/useDatabase";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast";

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onVideoEnd: () => void;
}

const VideoCard = ({ video, isActive, onVideoEnd }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Fetch user likes
  const { data: userLikes = [] } = useUserLikes(user?.id || '');
  const [isLiked, setIsLiked] = useState(false);
  
  // Like mutation
  const likeMutation = useLikeVideo();
  
  // Check if this video is liked by the user
  useEffect(() => {
    if (userLikes.includes(video.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [userLikes, video.id]);
  
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(error => {
          console.error("Video playback failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      onVideoEnd();
    }
  };

  const toggleLike = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like videos",
        variant: "destructive"
      });
      return;
    }
    
    likeMutation.mutate({ videoId: video.id, userId: user.id });
    // Optimistically update UI
    setIsLiked(!isLiked);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="video-container">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/20 backdrop-blur-sm">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="full-screen-video"
        playsInline
        muted={isMuted}
        loop
        preload="auto"
        onEnded={handleVideoEnd}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
      />
      
      <div className="video-overlay"></div>
      
      <div className="absolute top-0 left-0 right-0 p-5 z-10">
        <div className="content-pill">{video.domain}</div>
      </div>
      
      <div className="video-controls z-10">
        <div className="flex justify-between items-end">
          <div className="space-y-2 max-w-[80%]">
            <div className="flex items-center space-x-2">
              <img
                src={video.author.avatar}
                alt={video.author.name}
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
              />
              <div className="text-white">
                <p className="font-medium">{video.author.name}</p>
                <p className="text-xs text-white/70">@{video.author.username}</p>
              </div>
            </div>
            
            <h3 className="text-white font-medium text-lg">{video.title}</h3>
            <p className="text-white/80 text-sm line-clamp-2">{video.description}</p>
          </div>
          
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col items-center space-y-1">
              <Button 
                variant="icon" 
                size="icon" 
                className={cn(
                  "bg-black/30 text-white backdrop-blur-md border border-white/20",
                  isLiked && "text-red-500"
                )}
                onClick={toggleLike}
              >
                <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
              </Button>
              <span className="text-white text-xs">{formatNumber(video.likes)}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-1">
              <Button 
                variant="icon" 
                size="icon" 
                className="bg-black/30 text-white backdrop-blur-md border border-white/20"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <span className="text-white text-xs">{formatNumber(video.comments)}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-1">
              <Button 
                variant="icon" 
                size="icon" 
                className="bg-black/30 text-white backdrop-blur-md border border-white/20"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <span className="text-white text-xs">{formatNumber(video.shares)}</span>
            </div>
            
            <Button 
              variant="icon" 
              size="icon" 
              className="bg-black/30 text-white backdrop-blur-md border border-white/20"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <ChevronUp className="h-6 w-6 text-white animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
