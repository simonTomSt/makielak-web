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
      categories: {
        Row: {
          background_image: string | null
          description: string | null
          id: string
          name: string | null
          on_home: boolean
          thumb_image: string | null
        }
        Insert: {
          background_image?: string | null
          description?: string | null
          id?: string
          name?: string | null
          on_home?: boolean
          thumb_image?: string | null
        }
        Update: {
          background_image?: string | null
          description?: string | null
          id?: string
          name?: string | null
          on_home?: boolean
          thumb_image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_background_image_fkey"
            columns: ["background_image"]
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_thumb_image_fkey"
            columns: ["thumb_image"]
            referencedRelation: "images"
            referencedColumns: ["id"]
          }
        ]
      }
      content: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          key: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          key: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          key?: string
        }
        Relationships: []
      }
      content_images: {
        Row: {
          created_at: string | null
          id: string
          image: string | null
          key: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image?: string | null
          key: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image?: string | null
          key?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_images_image_fkey"
            columns: ["image"]
            referencedRelation: "images"
            referencedColumns: ["id"]
          }
        ]
      }
      images: {
        Row: {
          created_at: string | null
          id: string
          url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          url?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          description: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          category_id?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Update: {
          category_id?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_image_fkey"
            columns: ["image"]
            referencedRelation: "images"
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
