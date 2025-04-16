
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Custom Rating component
const Rating = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl focus:outline-none ${
            star <= value ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => onChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

interface Teacher {
  id: number;
  name: string;
  course: string;
  department: string;
}

const RateTeachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [teachingRating, setTeachingRating] = useState(0);
  const [knowledgeRating, setKnowledgeRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [availabilityRating, setAvailabilityRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in a real app, this would come from your API
  const teachers: Teacher[] = [
    { id: 1, name: "Dr. Jane Smith", course: "Database Systems", department: "Computer Science" },
    { id: 2, name: "Prof. Michael Johnson", course: "Data Structures", department: "Computer Science" },
    { id: 3, name: "Dr. Robert Williams", course: "Operating Systems", department: "Computer Science" },
    { id: 4, name: "Prof. Sarah Thompson", course: "Computer Networks", department: "Computer Science" },
    { id: 5, name: "Dr. David Clark", course: "Software Engineering", department: "Computer Science" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTeacher) {
      toast.error("Please select a teacher to rate");
      return;
    }
    
    if (teachingRating === 0 || knowledgeRating === 0 || communicationRating === 0 || availabilityRating === 0) {
      toast.error("Please provide ratings for all categories");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      // This is a mock implementation
      const selectedTeacherData = teachers.find(t => t.id === selectedTeacher);
      
      const feedbackData = {
        teacherId: selectedTeacher,
        teacherName: selectedTeacherData?.name,
        ratings: {
          teaching: teachingRating,
          knowledge: knowledgeRating,
          communication: communicationRating,
          availability: availabilityRating,
        },
        feedback: feedbackText,
        timestamp: new Date().toISOString()
      };
      
      console.log("Submitting feedback:", feedbackData);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset form
      setSelectedTeacher(null);
      setTeachingRating(0);
      setKnowledgeRating(0);
      setCommunicationRating(0);
      setAvailabilityRating(0);
      setFeedbackText("");
      
      toast.success("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Rate Your Teachers</h2>
          <p className="text-muted-foreground mt-1">
            Your feedback helps improve teaching quality and is completely anonymous
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Teacher Evaluation Form</CardTitle>
            <CardDescription>
              Rate your teachers across different aspects of their teaching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="teacher">Select Teacher</Label>
                <Select 
                  value={selectedTeacher?.toString()} 
                  onValueChange={(value) => setSelectedTeacher(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a teacher to rate" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.name} - {teacher.course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTeacher && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Teaching Quality</Label>
                      <Rating value={teachingRating} onChange={setTeachingRating} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Subject Knowledge</Label>
                      <Rating value={knowledgeRating} onChange={setKnowledgeRating} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Communication Skills</Label>
                      <Rating value={communicationRating} onChange={setCommunicationRating} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Availability & Support</Label>
                      <Rating value={availabilityRating} onChange={setAvailabilityRating} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback">Additional Feedback (Optional)</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Share your thoughts about the teacher's strengths and areas for improvement..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RateTeachers;
