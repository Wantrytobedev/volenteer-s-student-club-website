// Generated จาก Supabase project จริง (bsgwqbgifjotxcwhzhnp) — ห้ามแก้มือ
// สร้างใหม่ได้ด้วย mcp Supabase generate_typescript_types หรือ `npx supabase gen types typescript`

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      camp_applications: {
        Row: {
          camp_id: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          status: string
          user_id: string | null
        }
        Insert: {
          camp_id: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          status?: string
          user_id?: string | null
        }
        Update: {
          camp_id?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "camp_applications_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "camp_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      camps: {
        Row: {
          application_deadline: string | null
          capacity: number | null
          cover_url: string | null
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          is_draft: boolean
          location: string | null
          slug: string
          starts_at: string | null
          title: string
        }
        Insert: {
          application_deadline?: string | null
          capacity?: number | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_draft?: boolean
          location?: string | null
          slug: string
          starts_at?: string | null
          title: string
        }
        Update: {
          application_deadline?: string | null
          capacity?: number | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_draft?: boolean
          location?: string | null
          slug?: string
          starts_at?: string | null
          title?: string
        }
        Relationships: []
      }
      notification_log: {
        Row: {
          camp_id: string | null
          channel: string
          id: string
          sent_at: string
          user_id: string | null
        }
        Insert: {
          camp_id?: string | null
          channel: string
          id?: string
          sent_at?: string
          user_id?: string | null
        }
        Update: {
          camp_id?: string | null
          channel?: string
          id?: string
          sent_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_log_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          categories: string[]
          updated_at: string
          user_id: string
          via_email: boolean
          via_line: boolean
        }
        Insert: {
          categories?: string[]
          updated_at?: string
          user_id: string
          via_email?: boolean
          via_line?: boolean
        }
        Update: {
          categories?: string[]
          updated_at?: string
          user_id?: string
          via_email?: boolean
          via_line?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          body: string | null
          cover_url: string | null
          created_at: string
          id: string
          published_at: string | null
          slug: string
          title: string
        }
        Insert: {
          author_id?: string | null
          body?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          slug: string
          title: string
        }
        Update: {
          author_id?: string | null
          body?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          faculty: string | null
          full_name: string | null
          id: string
          line_user_id: string | null
          phone: string | null
          role: string
          student_id: string | null
        }
        Insert: {
          created_at?: string
          faculty?: string | null
          full_name?: string | null
          id: string
          line_user_id?: string | null
          phone?: string | null
          role?: string
          student_id?: string | null
        }
        Update: {
          created_at?: string
          faculty?: string | null
          full_name?: string | null
          id?: string
          line_user_id?: string | null
          phone?: string | null
          role?: string
          student_id?: string | null
        }
        Relationships: []
      }
      site_banners: {
        Row: {
          created_at: string
          ends_at: string | null
          id: string
          is_active: boolean
          link_url: string | null
          message: string
          starts_at: string | null
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean
          link_url?: string | null
          message: string
          starts_at?: string | null
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean
          link_url?: string | null
          message?: string
          starts_at?: string | null
        }
        Relationships: []
      }
      sponsor_inquiries: {
        Row: {
          contact_name: string
          created_at: string
          email: string
          id: string
          message: string | null
          organization_name: string
          phone: string | null
          status: string
        }
        Insert: {
          contact_name: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          organization_name: string
          phone?: string | null
          status?: string
        }
        Update: {
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          organization_name?: string
          phone?: string | null
          status?: string
        }
        Relationships: []
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

type DefaultSchema = Database["public"]

export type Tables<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Row"]
export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Update"]
