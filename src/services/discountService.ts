
import { supabase, DiscountCode } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

// Generate a random discount code
const generateDiscountCode = () => {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let result = 'BSU-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Create a discount code for a product
export const createDiscountCode = async (productId: string): Promise<string> => {
  // Get current user
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    throw new Error('User not authenticated');
  }
  
  // Check if user is verified
  const { data: student } = await supabase
    .from('students')
    .select('verified')
    .eq('id', session.user.id)
    .single();
    
  if (!student || !student.verified) {
    throw new Error('Student verification required');
  }
  
  // Check for existing unused code for this product
  const { data: existingCodes } = await supabase
    .from('discount_codes')
    .select('*')
    .eq('product_id', productId)
    .eq('student_id', session.user.id)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single();
    
  if (existingCodes) {
    return existingCodes.code;
  }
  
  // Generate new code
  const discountCode = generateDiscountCode();
  
  // Set expiration to 7 days from now
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  // Insert new discount code
  const { error } = await supabase
    .from('discount_codes')
    .insert({
      code: discountCode,
      product_id: productId,
      student_id: session.user.id,
      used: false,
      expires_at: expiresAt.toISOString(),
      created_at: new Date().toISOString(),
    });
    
  if (error) {
    console.error('Error creating discount code:', error);
    throw error;
  }
  
  return discountCode;
};

// Mark a discount code as used
export const markDiscountCodeAsUsed = async (code: string): Promise<void> => {
  const { error } = await supabase
    .from('discount_codes')
    .update({ used: true })
    .eq('code', code);
    
  if (error) {
    console.error('Error marking discount code as used:', error);
    throw error;
  }
};

// Get user's discount codes
export const getUserDiscountCodes = async (): Promise<DiscountCode[]> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    throw new Error('User not authenticated');
  }
  
  const { data, error } = await supabase
    .from('discount_codes')
    .select('*')
    .eq('student_id', session.user.id)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching discount codes:', error);
    throw error;
  }
  
  return data;
};
