
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Suggestions = () => {
  const [suggestionType, setSuggestionType] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data of previous suggestions
  const previousSuggestions = [
    { id: 1, type: "Curriculum", text: "The Data Structures course should include more practical assignments", date: "2025-03-20", status: "Under Review" },
    { id: 2, type: "Facility", text: "Computer Lab 3 needs better ventilation system", date: "2025-02-15", status: "Implemented" },
    { id: 3, type: "Teaching", text: "Need more interactive teaching methods in Operating Systems class", date: "2025-01-10", status: "Acknowledged" }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!suggestionType) {
      toast.error("Please select a suggestion type");
      return;
    }
    
    if (!suggestionText.trim()) {
      toast.error("Please enter your suggestion");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      // This is a mock implementation
      const suggestionData = {
        type: suggestionType,
        text: suggestionText,
        timestamp: new Date().toISOString()
      };
      
      console.log("Submitting suggestion:", suggestionData);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset form
      setSuggestionType("");
      setSuggestionText("");
      
      toast.success("Your suggestion has been submitted anonymously");
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      toast.error("Failed to submit suggestion. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Anonymous Suggestions</h2>
          <p className="text-muted-foreground mt-1">
            Share your ideas to improve the academic environment
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Submit a Suggestion</CardTitle>
            <CardDescription>
              Your suggestions are completely anonymous and will be reviewed by faculty
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Suggestion Type</Label>
                <Select value={suggestionType} onValueChange={setSuggestionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of suggestion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Teaching">Teaching Methods</SelectItem>
                    <SelectItem value="Curriculum">Curriculum</SelectItem>
                    <SelectItem value="Facility">Facilities</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="suggestion">Your Suggestion</Label>
                <Textarea
                  id="suggestion"
                  placeholder="Describe your suggestion in detail..."
                  value={suggestionText}
                  onChange={(e) => setSuggestionText(e.target.value)}
                  rows={5}
                />
              </div>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Anonymously"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Previous Suggestions</CardTitle>
            <CardDescription>
              Your submitted suggestions and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {previousSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{suggestion.text}</p>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${
                        suggestion.status === "Implemented" 
                          ? "bg-green-100 text-green-800" 
                          : suggestion.status === "Under Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {suggestion.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(suggestion.date).toLocaleDateString()}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {suggestion.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Suggestions;
