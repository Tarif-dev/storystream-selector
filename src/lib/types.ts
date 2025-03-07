
export type Domain = 
  | "sports" 
  | "news" 
  | "entertainment" 
  | "tech" 
  | "finance" 
  | "food" 
  | "travel" 
  | "fashion" 
  | "health";

export interface Video {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  videoUrl: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  domain: Domain;
  description: string;
  trending?: boolean;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  selectedDomains: Domain[];
}
