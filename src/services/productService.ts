
import { supabase, ProductDB, CategoryDB } from '@/lib/supabase';
import { Product, Category, getProductById as getProductByIdLocal } from '@/data/productsData';

// Convert database product to frontend product
export const mapDbProductToProduct = (dbProduct: ProductDB): Product => ({
  id: dbProduct.id,
  name: dbProduct.name,
  brand: dbProduct.brand,
  category: dbProduct.category,
  originalPrice: dbProduct.original_price,
  discountedPrice: dbProduct.discounted_price,
  discountPercentage: dbProduct.discount_percentage,
  image: dbProduct.image_url,
  description: dbProduct.description,
  features: dbProduct.features,
  rating: dbProduct.rating,
  reviewCount: dbProduct.review_count,
  inStock: dbProduct.in_stock,
  isNew: dbProduct.is_new,
  isFeatured: dbProduct.is_featured,
  dealEnds: dbProduct.deal_ends ? new Date(dbProduct.deal_ends) : undefined,
});

// Convert database category to frontend category
export const mapDbCategoryToCategory = (dbCategory: CategoryDB): Category => ({
  id: dbCategory.id,
  name: dbCategory.name,
  slug: dbCategory.slug,
  description: dbCategory.description,
  image: dbCategory.image_url,
});

// Get all products from Supabase
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
      
    if (error) {
      console.error('Error fetching products:', error);
      // Fallback to local data if Supabase fails
      return [];
    }
    
    if (data && data.length > 0) {
      return data.map(mapDbProductToProduct);
    }
    
    // If no data from Supabase, use local data
    return [];
  } catch (error) {
    console.error('Exception fetching products:', error);
    return [];
  }
};

// Get featured products from Supabase
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true);
      
    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
    
    if (data && data.length > 0) {
      return data.map(mapDbProductToProduct);
    }
    
    // If no data from Supabase, use local data
    return [];
  } catch (error) {
    console.error('Exception fetching featured products:', error);
    return [];
  }
};

// Get products by category from Supabase
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);
      
    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
    
    if (data && data.length > 0) {
      return data.map(mapDbProductToProduct);
    }
    
    // If no data from Supabase, use local data
    return [];
  } catch (error) {
    console.error('Exception fetching products by category:', error);
    return [];
  }
};

// Get product by ID from Supabase or local data
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching product by ID from Supabase:', error);
      // Fall back to local data
      const localProduct = getProductByIdLocal(id);
      return localProduct || null;
    }
    
    return data ? mapDbProductToProduct(data) : getProductByIdLocal(id) || null;
  } catch (error) {
    console.error('Exception fetching product by ID:', error);
    // Fall back to local data
    const localProduct = getProductByIdLocal(id);
    return localProduct || null;
  }
};

// Get all categories from Supabase
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
      
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    return data ? data.map(mapDbCategoryToCategory) : [];
  } catch (error) {
    console.error('Exception fetching categories:', error);
    return [];
  }
};
