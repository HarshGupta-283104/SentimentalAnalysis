
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const Index = () => {
  const [activeRole, setActiveRole] = useState<'student' | 'faculty' | null>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'student' | 'faculty') => {
    setActiveRole(role);
  };

  const handleSuccessfulAuth = (role: 'student' | 'faculty') => {
    if (role === 'student') {
      navigate('/student-dashboard');
    } else {
      navigate('/faculty-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-education-blue-light to-education-blue-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Faculty Feedback System
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Improving education through constructive feedback and data-driven insights
          </p>
        </div>

        {!activeRole ? (
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all cursor-pointer overflow-hidden border-0 shadow-lg">
              <div className="bg-education-blue h-2 w-full"></div>
              <CardHeader className="text-center">
                <GraduationCap className="mx-auto h-12 w-12 text-education-blue mb-4" />
                <CardTitle className="text-2xl">Students</CardTitle>
                <CardDescription>
                  Rate your teachers and provide anonymous feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6">Share your experiences to help improve education quality</p>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto"
                  onClick={() => handleRoleSelect('student')}
                >
                  Continue as Student
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-xl transition-all cursor-pointer overflow-hidden border-0 shadow-lg">
              <div className="bg-education-green h-2 w-full"></div>
              <CardHeader className="text-center">
                <Users className="mx-auto h-12 w-12 text-education-green mb-4" />
                <CardTitle className="text-2xl">Faculty</CardTitle>
                <CardDescription>
                  View analytics and insights from student feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6">Analyze feedback data to enhance your teaching approach</p>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto bg-education-green hover:bg-education-green/90"
                  onClick={() => handleRoleSelect('faculty')}
                >
                  Continue as Faculty
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {activeRole === 'student' ? 'Student' : 'Faculty'} Access
              </CardTitle>
              <CardDescription className="text-center">
                Login or create a new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm role={activeRole} onSuccess={() => handleSuccessfulAuth(activeRole)} />
                </TabsContent>
                <TabsContent value="signup">
                  <SignupForm role={activeRole} onSuccess={() => handleSuccessfulAuth(activeRole)} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Button 
                variant="outline" 
                onClick={() => setActiveRole(null)}
                className="w-full"
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="mt-20 text-center text-white/70">
          <p>© 2025 Faculty Feedback System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
