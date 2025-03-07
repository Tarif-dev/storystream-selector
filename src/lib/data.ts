
import { Domain, User, Video } from "./types";

export const domains: { id: Domain; label: string; icon: string }[] = [
  { id: "sports", label: "Sports", icon: "🏆" },
  { id: "news", label: "News", icon: "📰" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "tech", label: "Technology", icon: "💻" },
  { id: "finance", label: "Finance", icon: "📈" },
  { id: "food", label: "Food", icon: "🍔" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "fashion", label: "Fashion", icon: "👗" },
  { id: "health", label: "Health", icon: "🏥" }
];

export const currentUser: User = {
  id: "user1",
  name: "Alex Johnson",
  username: "alexj",
  avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&h=200&auto=format&fit=crop",
  bio: "Digital explorer and content creator",
  followersCount: 1240,
  followingCount: 420,
  selectedDomains: ["tech", "entertainment", "sports"]
};

export const mockVideos: Video[] = [
  {
    id: "video1",
    title: "Morning Tech Update",
    author: {
      id: "user2",
      name: "Tech Daily",
      username: "techdaily",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop"
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-app-interface-showcase-386-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
    likes: 1542,
    comments: 89,
    shares: 45,
    domain: "tech",
    description: "The latest in tech news - AI breakthroughs, new gadgets, and more.",
    trending: true
  },
  {
    id: "video2",
    title: "NBA Highlights",
    author: {
      id: "user3",
      name: "Sports Central",
      username: "sportscentral",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=200&auto=format&fit=crop"
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-basketball-player-dribbling-and-making-a-shot-40678-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?q=80&w=1000&auto=format&fit=crop",
    likes: 2341,
    comments: 156,
    shares: 89,
    domain: "sports",
    description: "Watch the most exciting moments from last night's NBA games."
  },
  {
    id: "video3",
    title: "Breaking News",
    author: {
      id: "user4",
      name: "Global News",
      username: "globalnews",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-news-opener-130-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop",
    likes: 987,
    comments: 243,
    shares: 321,
    domain: "news",
    description: "Breaking news coverage from around the world.",
    trending: true
  },
  {
    id: "video4",
    title: "Movie Trailer",
    author: {
      id: "user5",
      name: "Entertainment Now",
      username: "entertainmentnow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop"
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mysterious-trailer-background-with-a-countdown-32204-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
    likes: 3421,
    comments: 532,
    shares: 623,
    domain: "entertainment",
    description: "Exclusive trailer for the most anticipated movie of the year."
  },
  {
    id: "video5",
    title: "Investment Tips",
    author: {
      id: "user6",
      name: "Finance Guru",
      username: "financeguru",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-statistics-in-a-corporate-meeting-room-44892-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
    likes: 872,
    comments: 134,
    shares: 76,
    domain: "finance",
    description: "Expert tips on how to invest wisely in today's market."
  }
];

export const getFilteredVideos = (selectedDomains: Domain[]): Video[] => {
  if (selectedDomains.length === 0) return mockVideos;
  return mockVideos.filter(video => selectedDomains.includes(video.domain));
};
