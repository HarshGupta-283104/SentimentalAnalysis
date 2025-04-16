
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const Analytics = () => {
  const [semester, setSemester] = useState("Fall 2024");
  const [section, setSection] = useState("All");

  // Mock data for charts
  const semesterList = ["Spring 2024", "Summer 2024", "Fall 2024", "Spring 2025"];
  const sectionList = ["All", "EA", "EB", "EC", "FA", "FB"];

  const ratingTrendData = [
    { semester: "Spring 2023", rating: 3.8 },
    { semester: "Fall 2023", rating: 4.0 },
    { semester: "Spring 2024", rating: 4.1 },
    { semester: "Fall 2024", rating: 4.2 },
  ];

  const categoryRatingsData = [
    { category: "Teaching Quality", rating: 4.2 },
    { category: "Subject Knowledge", rating: 4.5 },
    { category: "Communication", rating: 3.8 },
    { category: "Availability", rating: 4.0 },
    { category: "Course Materials", rating: 4.1 },
    { category: "Assessment Methods", rating: 3.9 },
  ];

  const sectionComparisonData = [
    { section: "EA", teaching: 4.3, knowledge: 4.6, communication: 4.0 },
    { section: "EB", teaching: 4.1, knowledge: 4.4, communication: 3.7 },
    { section: "EC", teaching: 4.2, knowledge: 4.5, communication: 3.9 },
    { section: "FA", teaching: 3.9, knowledge: 4.3, communication: 3.6 },
    { section: "FB", teaching: 4.0, knowledge: 4.2, communication: 3.8 },
  ];

  const sentimentData = [
    { name: "Positive", value: 65 },
    { name: "Neutral", value: 25 },
    { name: "Negative", value: 10 },
  ];

  const SENTIMENT_COLORS = ["#10B981", "#3B82F6", "#EF4444"];

  const radarData = [
    { subject: "Teaching", A: 4.2, B: 3.8, fullMark: 5 },
    { subject: "Knowledge", A: 4.5, B: 4.1, fullMark: 5 },
    { subject: "Communication", A: 3.8, B: 3.5, fullMark: 5 },
    { subject: "Availability", A: 4.0, B: 3.7, fullMark: 5 },
    { subject: "Materials", A: 4.1, B: 3.9, fullMark: 5 },
    { subject: "Assessment", A: 3.9, B: 3.6, fullMark: 5 },
  ];

  const feedbackVolumeData = [
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

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Feedback Analytics</h2>
          <p className="text-muted-foreground mt-1">
            Analyze feedback data across semesters and sections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Semester</Label>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {semesterList.map((sem) => (
                  <SelectItem key={sem} value={sem}>
                    {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Section</Label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {sectionList.map((sec) => (
                  <SelectItem key={sec} value={sec}>
                    {sec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ratings">Rating Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Section Comparison</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Trend</CardTitle>
                  <CardDescription>Overall rating across semesters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ratingTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="semester" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="rating"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Ratings</CardTitle>
                  <CardDescription>Average ratings by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categoryRatingsData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 5]} />
                        <YAxis dataKey="category" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="rating" fill="#10B981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Feedback Volume</CardTitle>
                  <CardDescription>Number of feedback submissions by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={feedbackVolumeData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
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
            </div>
          </TabsContent>
          
          <TabsContent value="ratings" className="mt-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Detailed analysis of each rating category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 5]} />
                        <Radar
                          name="Current Semester"
                          dataKey="A"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="Previous Semester"
                          dataKey="B"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.6}
                        />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Semester Comparison</CardTitle>
                  <CardDescription>Rating trends across semesters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ratingTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="semester" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="rating"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Section Comparison</CardTitle>
                <CardDescription>Performance comparison across different sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sectionComparisonData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="section" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="teaching" name="Teaching Quality" fill="#3B82F6" />
                      <Bar dataKey="knowledge" name="Subject Knowledge" fill="#10B981" />
                      <Bar dataKey="communication" name="Communication" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sentiment" className="mt-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Distribution</CardTitle>
                  <CardDescription>Feedback sentiment analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>Sentiment analysis summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-green-600 mb-2">Positive Feedback Trends</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Strong appreciation for practical examples in lectures</li>
                      <li>Students value office hours availability</li>
                      <li>Course materials are considered well-organized</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-blue-600 mb-2">Areas for Improvement</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Pace of lectures could be adjusted</li>
                      <li>More interactive elements in class requested</li>
                      <li>Additional practice problems would be helpful</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-red-600 mb-2">Action Items</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Review assignment difficulty and workload</li>
                      <li>Consider incorporating more group activities</li>
                      <li>Provide more detailed feedback on assessments</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
