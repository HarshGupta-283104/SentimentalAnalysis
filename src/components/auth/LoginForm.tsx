
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  role: 'student' | 'faculty';
  onSuccess: () => void;
}

const LoginForm = ({ role, onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // First, try to authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Now check if the user has the correct role in our Users table
      const { data: userData, error: userError } = await supabase
        .from('Users Table')
        .select('role')
        .eq('email', email)
        .maybeSingle();
      
      if (userError) {
        // Handle case where user exists in auth but not in our table
        await supabase.auth.signOut();
        throw new Error("User account not properly set up. Please contact support.");
      }
      
      if (!userData) {
        await supabase.auth.signOut();
        throw new Error("User profile not found. Please sign up first.");
      }
      
      if (userData.role !== role) {
        // Role mismatch
        await supabase.auth.signOut();
        throw new Error(`This account is not registered as a ${role}. Please use the correct login option.`);
      }
      
      toast.success(`Welcome back!`);
      onSuccess();
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Set up auth listener to check for existing session
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          console.log("Auth state changed:", event, session);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a 
            href="#" 
            className="text-sm text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Password reset functionality will be implemented soon!");
            }}
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
