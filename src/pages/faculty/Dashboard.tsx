
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  // Mock data for charts
  const monthlyFeedbackData = [
    { month: "Jan", count: 15 },
    { month: "Feb", count: 20 },
    { month: "Mar", count: 25 },
    { month: "Apr", count: 30 },
    { month: "May", count: 22 },
    { month: "Jun", count: 18 },
    { month: "Jul", count: 25 },
    { month: "Aug", count: 30 },
    { month: "Sep", count: 40 },
    { month: "Oct", count: 35 },
    { month: "Nov", count: 28 },
    { month: "Dec", count: 20 },
  ];

  const ratingCategoriesData = [
    { name: "Teaching Quality", value: 4.2 },
    { name: "Knowledge", value: 4.5 },
    { name: "Communication", value: 3.8 },
    { name: "Availability", value: 4.0 },
  ];

  const sectionWiseData = [
    { name: "EA", value: 25 },
    { name: "EB", value: 30 },
    { name: "EC", value: 20 },
    { name: "FA", value: 15 },
    { name: "FB", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A4DE6C"];

  // Sentiment data
  const sentimentData = {
    positive: 65,
    neutral: 25,
    negative: 10,
  };

  // Recent suggestions
  const recentSuggestions = [
    { 
      id: 1, 
      text: "The Data Structures course should include more practical assignments",
      sentiment: "positive",
      date: "2025-04-15"
    },
    { 
      id: 2, 
      text: "Need more interactive teaching methods in Operating Systems class",
      sentiment: "neutral",
      date: "2025-04-12"
    },
    { 
      id: 3, 
      text: "Lab sessions are too short to complete the assignments",
      sentiment: "negative",
      date: "2025-04-10"
    },
  ];

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold">Welcome Back, Professor!</h2>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/faculty-dashboard/analytics')}>
              <BarChart className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button variant="outline" onClick={() => navigate('/faculty-dashboard/feedback')}>
              View All Feedback
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2/5.0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on 120 student feedbacks
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sentiment Analysis</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-green-600">{sentimentData.positive}%</div>
                <div className="text-sm text-muted-foreground">Positive</div>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>{sentimentData.neutral}% Neutral</span>
                <span>{sentimentData.negative}% Needs Improvement</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Suggestions</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground mt-1">
                11 new since last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Feedback Over Time</CardTitle>
              <CardDescription>Monthly feedback submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyFeedbackData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Rating Categories</CardTitle>
              <CardDescription>Performance across different aspects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={ratingCategoriesData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Section Distribution</CardTitle>
              <CardDescription>Feedback by student section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={sectionWiseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sectionWiseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Suggestions</CardTitle>
              <CardDescription>Latest anonymous feedback from students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <p className="font-medium">{suggestion.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(suggestion.date).toLocaleDateString()}
                      </span>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${
                          suggestion.sentiment === "positive" 
                            ? "bg-green-100 text-green-800" 
                            : suggestion.sentiment === "neutral"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {suggestion.sentiment === "positive" ? "Positive" : 
                         suggestion.sentiment === "neutral" ? "Neutral" : "Needs Attention"}
                      </span>
                    </div>
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

export default FacultyDashboard;
