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
      comments: {
        Row: {
          created_at: string
          id: number
          post_id: number
          profile_id: string
          text: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          profile_id: string
          text: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          profile_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          created_at: string
          id: number
          profile_id: string
          text: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          profile_id: string
          text: string
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          profile_id?: string
          text?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          created_at: string
          id: string
          profile_user_id: string
          user_name: string
          user_role: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_user_id: string
          user_name: string
          user_role: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_user_id?: string
          user_name?: string
          user_role?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_profile_user_id_fkey"
            columns: ["profile_user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
