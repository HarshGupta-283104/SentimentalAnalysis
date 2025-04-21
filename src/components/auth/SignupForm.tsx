
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SignupFormProps {
  role: 'student' | 'faculty';
  onSuccess: () => void;
}

const SignupForm = ({ role, onSuccess }: SignupFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [section, setSection] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First check if the email already exists in Users Table
      const { data: existingUser, error: checkError } = await supabase
        .from('Users Table')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (checkError) {
        console.error("Error checking existing user:", checkError);
      }
      
      if (existingUser) {
        throw new Error("An account with this email already exists. Please log in instead.");
      }
      
      // Step 1: Create the auth account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            section: role === 'student' ? section : null,
            department: role === 'faculty' ? department : null
          }
        }
      });
      
      if (authError) throw authError;
      
      if (!authData.user?.id) {
        throw new Error("Failed to create user account");
      }

      // Generate a numeric ID for the Users Table since it expects a bigint
      // We'll use the current timestamp + a random number to ensure uniqueness
      const numericId = Date.now() + Math.floor(Math.random() * 1000);
      
      // Step 2: Insert user data into the Users Table with our numeric ID
      const { error: insertError } = await supabase
        .from('Users Table')
        .insert({
          id: numericId, // Use a generated numeric ID instead of the UUID
          email, 
          name,
          role,
          section: role === 'student' ? section : '',
          password // Note: This is likely redundant since Supabase Auth already stores the hashed password
        });
      
      if (insertError) {
        console.error("Error creating user profile:", insertError);
        // If there's an error inserting the profile, we should sign out and clean up
        await supabase.auth.signOut();
        
        if (insertError.code === "23505") {
          throw new Error("An account with this email already exists. Please log in instead.");
        } else {
          throw new Error("Failed to create user profile. Please try again.");
        }
      }
      
      // Step 3: If the user is a teacher, also add them to the Teachers table
      if (role === 'faculty') {
        const { error: teacherError } = await supabase
          .from('Teacher')
          .insert({
            name,
            email,
            department,
            created_at: new Date().toISOString()
          });
        
        if (teacherError) {
          console.error("Error creating teacher profile:", teacherError);
          // Continue anyway since the main user account was created successfully
        }
      }
      
      toast.success(`Account created successfully!`);
      onSuccess();
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed. Please try again.");
      
      // Try to sign out if auth was successful but other steps failed
      await supabase.auth.signOut();
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
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
      
      {role === 'student' ? (
        <div className="space-y-2">
          <Label htmlFor="section">Section</Label>
          <Select value={section} onValueChange={setSection} required>
            <SelectTrigger>
              <SelectValue placeholder="Select your section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EA">EA</SelectItem>
              <SelectItem value="EB">EB</SelectItem>
              <SelectItem value="EC">EC</SelectItem>
              <SelectItem value="FA">FA</SelectItem>
              <SelectItem value="FB">FB</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={department} onValueChange={setDepartment} required>
            <SelectTrigger>
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
              <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
              <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
