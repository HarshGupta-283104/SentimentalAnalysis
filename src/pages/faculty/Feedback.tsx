
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Feedback {
  id: number;
  type: "rating" | "suggestion";
  course?: string;
  date: string;
  ratings?: {
    teaching: number;
    knowledge: number;
    communication: number;
    availability: number;
  };
  text?: string;
  sentiment?: "positive" | "neutral" | "negative";
  section?: string;
}

const Feedback = () => {
  const [filterText, setFilterText] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");

  // Mock data
  const feedbackData: Feedback[] = [
    {
      id: 1,
      type: "rating",
      course: "Database Systems",
      date: "2025-04-15",
      ratings: {
        teaching: 4,
        knowledge: 5,
        communication: 4,
        availability: 3
      },
      text: "Very well-organized course. The professor explains complex concepts clearly.",
      sentiment: "positive",
      section: "EA"
    },
    {
      id: 2,
      type: "rating",
      course: "Database Systems",
      date: "2025-04-14",
      ratings: {
        teaching: 5,
        knowledge: 5,
        communication: 4,
        availability: 4
      },
      text: "Great teaching style, but office hours could be more flexible.",
      sentiment: "positive",
      section: "EB"
    },
    {
      id: 3,
      type: "rating",
      course: "Data Structures",
      date: "2025-04-12",
      ratings: {
        teaching: 3,
        knowledge: 5,
        communication: 3,
        availability: 4
      },
      text: "The pace of the lectures is sometimes too fast to follow along.",
      sentiment: "neutral",
      section: "EA"
    },
    {
      id: 4,
      type: "suggestion",
      date: "2025-04-10",
      text: "The Data Structures course should include more practical assignments.",
      sentiment: "neutral",
      section: "EC"
    },
    {
      id: 5,
      type: "suggestion",
      date: "2025-04-08",
      text: "Need more interactive teaching methods in Operating Systems class.",
      sentiment: "neutral",
      section: "FA"
    },
    {
      id: 6,
      type: "rating",
      course: "Operating Systems",
      date: "2025-04-05",
      ratings: {
        teaching: 2,
        knowledge: 4,
        communication: 2,
        availability: 3
      },
      text: "Concepts are explained in a confusing way. More examples would help.",
      sentiment: "negative",
      section: "FB"
    },
    {
      id: 7,
      type: "suggestion",
      date: "2025-04-03",
      text: "Lab sessions are too short to complete the assignments.",
      sentiment: "negative",
      section: "EB"
    },
    {
      id: 8,
      type: "rating",
      course: "Computer Networks",
      date: "2025-04-01",
      ratings: {
        teaching: 4,
        knowledge: 5,
        communication: 4,
        availability: 5
      },
      text: "Excellent course content and the professor is very helpful during office hours.",
      sentiment: "positive",
      section: "EA"
    }
  ];

  const courses = ["all", ...new Set(feedbackData.filter(f => f.course).map(f => f.course))];
  const sections = ["all", ...new Set(feedbackData.map(f => f.section))];

  // Filter feedback based on user selections
  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesText = filterText === "" || 
      (feedback.text && feedback.text.toLowerCase().includes(filterText.toLowerCase())) ||
      (feedback.course && feedback.course.toLowerCase().includes(filterText.toLowerCase()));
    
    const matchesCourse = courseFilter === "all" || feedback.course === courseFilter;
    const matchesSentiment = sentimentFilter === "all" || feedback.sentiment === sentimentFilter;
    const matchesSection = sectionFilter === "all" || feedback.section === sectionFilter;
    
    return matchesText && matchesCourse && matchesSentiment && matchesSection;
  });

  const ratings = filteredFeedback.filter(f => f.type === "rating");
  const suggestions = filteredFeedback.filter(f => f.type === "suggestion");

  // Helper function to render rating stars
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-lg ${i < rating ? "text-yellow-500" : "text-gray-300"}`}>
          ★
        </span>
      ));
  };

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Student Feedback</h2>
          <p className="text-muted-foreground mt-1">
            View and analyze all feedback submitted by students
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Filters</CardTitle>
            <CardDescription>
              Filter feedback by course, sentiment, or search for specific terms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search feedback..."
                    className="pl-8"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course === "all" ? "All Courses" : course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sentiment">Sentiment</Label>
                <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                  <SelectTrigger id="sentiment">
                    <SelectValue placeholder="All Sentiments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sentiments</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select value={sectionFilter} onValueChange={setSectionFilter}>
                  <SelectTrigger id="section">
                    <SelectValue placeholder="All Sections" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section} value={section}>
                        {section === "all" ? "All Sections" : section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilterText("");
                    setCourseFilter("all");
                    setSentimentFilter("all");
                    setSectionFilter("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Feedback ({filteredFeedback.length})</TabsTrigger>
            <TabsTrigger value="ratings">Ratings ({ratings.length})</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="space-y-6">
              {filteredFeedback.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">No feedback matches your filters.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredFeedback.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {feedback.type === "rating" ? 
                            `Rating for ${feedback.course}` : 
                            "Anonymous Suggestion"
                          }
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                            {feedback.section}
                          </span>
                          <span 
                            className={`text-xs px-2 py-1 rounded-full ${
                              feedback.sentiment === "positive" 
                                ? "bg-green-100 text-green-800" 
                                : feedback.sentiment === "neutral"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {feedback.sentiment === "positive" ? "Positive" : 
                             feedback.sentiment === "neutral" ? "Neutral" : "Needs Attention"}
                          </span>
                        </div>
                      </div>
                      <CardDescription>
                        Submitted on {new Date(feedback.date).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {feedback.type === "rating" && feedback.ratings && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Teaching</p>
                            <div className="flex mt-1">{renderStars(feedback.ratings.teaching)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Knowledge</p>
                            <div className="flex mt-1">{renderStars(feedback.ratings.knowledge)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Communication</p>
                            <div className="flex mt-1">{renderStars(feedback.ratings.communication)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Availability</p>
                            <div className="flex mt-1">{renderStars(feedback.ratings.availability)}</div>
                          </div>
                        </div>
                      )}
                      {feedback.text && (
                        <p className="mt-2">{feedback.text}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="ratings" className="mt-6">
            <div className="space-y-6">
              {ratings.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">No ratings match your filters.</p>
                  </CardContent>
                </Card>
              ) : (
                ratings.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Rating for {feedback.course}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                            {feedback.section}
                          </span>
                          <span 
                            className={`text-xs px-2 py-1 rounded-full ${
                              feedback.sentiment === "positive" 
                                ? "bg-green-100 text-green-800" 
                                : feedback.sentiment === "neutral"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {feedback.sentiment === "positive" ? "Positive" : 
                             feedback.sentiment === "neutral" ? "Neutral" : "Needs Attention"}
                          </span>
                        </div>
                      </div>
                      <CardDescription>
                        Submitted on {new Date(feedback.date).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {feedback.ratings && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Teaching</p>
                            <div className="flex mt-1">{renderStars(feedback.ratings.teaching)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Knowledge</p>
                            <div className="flex mt-1">{renderStars(feedback.ratings.knowledge)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Communication</p>
                            <div className="flex mt-1">{renderStars(feedback.ratings.communication)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Availability</p>
                            <div className="flex mt-1">{renderStars(feedback.ratings.availability)}</div>
                          </div>
                        </div>
                      )}
                      {feedback.text && (
                        <p className="mt-2">{feedback.text}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions" className="mt-6">
            <div className="space-y-6">
              {suggestions.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">No suggestions match your filters.</p>
                  </CardContent>
                </Card>
              ) : (
                suggestions.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Anonymous Suggestion
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                            {feedback.section}
                          </span>
                          <span 
                            className={`text-xs px-2 py-1 rounded-full ${
                              feedback.sentiment === "positive" 
                                ? "bg-green-100 text-green-800" 
                                : feedback.sentiment === "neutral"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {feedback.sentiment === "positive" ? "Positive" : 
                             feedback.sentiment === "neutral" ? "Neutral" : "Needs Attention"}
                          </span>
                        </div>
                      </div>
                      <CardDescription>
                        Submitted on {new Date(feedback.date).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {feedback.text && (
                        <p>{feedback.text}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
