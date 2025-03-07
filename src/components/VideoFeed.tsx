
import { useState, useRef, useEffect } from "react";
import { Video, Domain } from "@/lib/types";
import VideoCard from "./VideoCard";
import { getFilteredVideos } from "@/lib/data";

interface VideoFeedProps {
  selectedDomains: Domain[];
}

const VideoFeed = ({ selectedDomains }: VideoFeedProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    setVideos(getFilteredVideos(selectedDomains));
  }, [selectedDomains]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!feedRef.current) return;
      
      const container = feedRef.current;
      const scrollPosition = container.scrollTop;
      const viewportHeight = container.clientHeight;
      
      let newActiveIndex = 0;
      videoRefs.current.forEach((videoRef, index) => {
        if (!videoRef) return;
        
        const videoBounds = videoRef.getBoundingClientRect();
        const videoCenter = videoBounds.top + videoBounds.height / 2;
        const viewportCenter = viewportHeight / 2;
        
        if (Math.abs(videoCenter - viewportCenter) < viewportHeight / 2) {
          newActiveIndex = index;
        }
      });
      
      setActiveIndex(newActiveIndex);
    };
    
    const feedElement = feedRef.current;
    if (feedElement) {
      feedElement.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }
    
    return () => {
      if (feedElement) {
        feedElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [videos]);
  
  const handleVideoEnd = () => {
    if (feedRef.current && activeIndex < videos.length - 1) {
      const nextVideoElement = videoRefs.current[activeIndex + 1];
      if (nextVideoElement) {
        const containerTop = feedRef.current.getBoundingClientRect().top;
        const nextVideoTop = nextVideoElement.getBoundingClientRect().top;
        const scrollOffset = nextVideoTop - containerTop;
        
        feedRef.current.scrollBy({
          top: scrollOffset,
          behavior: "smooth"
        });
      }
    }
  };
  
  // Reset refs array when videos change
  videoRefs.current = [];
  
  return (
    <div
      ref={feedRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
    >
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div
            key={video.id}
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            className="h-full w-full snap-start snap-always"
          >
            <VideoCard
              video={video}
              isActive={index === activeIndex}
              onVideoEnd={handleVideoEnd}
            />
          </div>
        ))
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-lg font-medium">No videos found</p>
            <p className="text-sm text-muted-foreground">
              Try selecting different categories
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
