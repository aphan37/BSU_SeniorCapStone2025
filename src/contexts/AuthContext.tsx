
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, Student } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  studentProfile: Student | null;
  isLoading: boolean;
  isVerified: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, studentId: string, firstName: string, lastName: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  requestVerification: () => Promise<{ error: any | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for active session on load
    const fetchSession = async () => {
      setIsLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      }
      
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        fetchStudentProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    };
    
    fetchSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        
        if (session?.user) {
          fetchStudentProfile(session.user.id);
        } else {
          setStudentProfile(null);
          setIsLoading(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);
  
  const fetchStudentProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      toast({
        title: "Profile Error",
        description: "Failed to load student profile",
        variant: "destructive",
      });
      setStudentProfile(null);
    } else {
      setStudentProfile(data);
    }
    
    setIsLoading(false);
  };
  
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
    
    toast({
      title: "Signed In",
      description: "Welcome back to BSU Tech Deals!",
    });
    
    return { error: null };
  };
  
  const signUp = async (email: string, password: string, studentId: string, firstName: string, lastName: string) => {
    // Validate BSU email - updated to accept both domains
    if (!email.endsWith('@bowiestate.edu') && !email.endsWith('@students.bowiestate.edu')) {
      toast({
        title: "Invalid Email",
        description: "Please use your Bowie State University email address (@bowiestate.edu or @students.bowiestate.edu).",
        variant: "destructive",
      });
      return { error: new Error("Invalid email domain") };
    }
    
    // Validate student ID format - 7 digits
    if (!/^\d{7}$/.test(studentId)) {
      toast({
        title: "Invalid Student ID",
        description: "Student ID must be exactly 7 digits.",
        variant: "destructive",
      });
      return { error: new Error("Invalid student ID format") };
    }
    
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          student_id: studentId,
          first_name: firstName,
          last_name: lastName,
        }
      }
    });
    
    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
    
    // Create student profile record
    if (data.user) {
      const { error: profileError } = await supabase.from('students').insert({
        id: data.user.id,
        email,
        student_id: studentId,
        first_name: firstName,
        last_name: lastName,
        verified: false,
        created_at: new Date().toISOString(),
      });
      
      if (profileError) {
        toast({
          title: "Profile Creation Failed",
          description: profileError.message,
          variant: "destructive",
        });
        return { error: profileError };
      }
    }
    
    toast({
      title: "Account Created",
      description: "Welcome to BSU Tech Deals! Please verify your email.",
    });
    
    return { error: null };
  };
  
  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed Out",
      description: "You have been signed out.",
    });
  };
  
  const requestVerification = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to request verification.",
        variant: "destructive",
      });
      return { error: new Error("Not authenticated") };
    }
    
    // In a real implementation, this would trigger a server function
    // that validates the student with BSU's systems
    const { error } = await supabase
      .from('students')
      .update({ verified: true })
      .eq('id', user.id);
      
    if (error) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
    
    // Update local state
    if (studentProfile) {
      setStudentProfile({
        ...studentProfile,
        verified: true
      });
    }
    
    toast({
      title: "Verification Complete",
      description: "Your student status has been verified!",
    });
    
    return { error: null };
  };
  
  const value = {
    session,
    user,
    studentProfile,
    isLoading,
    isVerified: !!studentProfile?.verified,
    signIn,
    signUp,
    signOut,
    requestVerification,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
