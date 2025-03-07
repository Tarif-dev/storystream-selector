
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          username: string
          avatar: string
          bio: string
          followers_count: number
          following_count: number
          selected_domains: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          username: string
          avatar?: string
          bio?: string
          followers_count?: number
          following_count?: number
          selected_domains?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          username?: string
          avatar?: string
          bio?: string
          followers_count?: number
          following_count?: number
          selected_domains?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          title: string
          author_id: string
          video_url: string
          thumbnail: string
          likes: number
          comments: number
          shares: number
          domain: string
          description: string
          trending: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          author_id: string
          video_url: string
          thumbnail: string
          likes?: number
          comments?: number
          shares?: number
          domain: string
          description: string
          trending?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          author_id?: string
          video_url?: string
          thumbnail?: string
          likes?: number
          comments?: number
          shares?: number
          domain?: string
          description?: string
          trending?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          video_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          video_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          video_id?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          user_id: string
          video_id: string
          text: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          video_id: string
          text: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          video_id?: string
          text?: string
          created_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
