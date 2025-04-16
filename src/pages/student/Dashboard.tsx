
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from your API
  const recentActivity = [
    { id: 1, action: "Submitted feedback for Dr. Jane Smith", date: "2025-04-15", course: "Database Systems" },
    { id: 2, action: "Submitted feedback for Prof. Michael Johnson", date: "2025-04-14", course: "Data Structures" },
    { id: 3, action: "Provided a suggestion for Computer Lab facilities", date: "2025-04-10", type: "Facility" }
  ];
  
  const pendingFeedbacks = [
    { id: 1, teacher: "Dr. Robert Williams", course: "Operating Systems" },
    { id: 2, teacher: "Prof. Sarah Thompson", course: "Computer Networks" },
    { id: 3, teacher: "Dr. David Clark", course: "Software Engineering" }
  ];
  
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold">Welcome Back, Student!</h2>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/student-dashboard/rate')}>
              <Star className="mr-2 h-4 w-4" />
              Rate Teachers
            </Button>
            <Button variant="outline" onClick={() => navigate('/student-dashboard/suggestions')}>
              Provide Suggestions
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Feedbacks Given</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across 4 different courses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Feedbacks</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingFeedbacks.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                For this semester
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Section</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">EB</div>
              <p className="text-xs text-muted-foreground mt-1">
                Spring 2025
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent feedback submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100">
                    <div className="w-full">
                      <p className="font-medium">{activity.action}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                        {activity.course && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {activity.course}
                          </span>
                        )}
                        {activity.type && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {activity.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Pending Feedbacks</CardTitle>
              <CardDescription>Teachers you still need to rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{feedback.teacher}</p>
                      <Button variant="ghost" size="sm" onClick={() => navigate('/student-dashboard/rate')}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{feedback.course}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
