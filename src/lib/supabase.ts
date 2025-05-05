
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export type Student = {
  id: string;
  email: string;
  student_id: string;
  first_name: string;
  last_name: string;
  verified: boolean;
  created_at: string;
};

export type ProductDB = {
  id: string;
  name: string;
  brand: string;
  category: string;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  image_url: string;
  description: string;
  features: string[];
  rating: number;
  review_count: number;
  in_stock: boolean;
  is_new: boolean;
  is_featured: boolean;
  deal_ends?: string;
  created_at: string;
};

export type CategoryDB = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
};

export type DiscountCode = {
  id: string;
  code: string;
  product_id: string;
  student_id: string;
  used: boolean;
  expires_at: string;
  created_at: string;
};
