
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SuggestionRow {
  id: number;
  type: string | null;
  text: string | null;
  date: string | null;
  status: string | null;
}

const Suggestions = () => {
  const [suggestionType, setSuggestionType] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousSuggestions, setPreviousSuggestions] = useState<SuggestionRow[]>([]);
  const [fetching, setFetching] = useState(false);

  // Get current student's numeric id from Users Table
  const [studentId, setStudentId] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudentIdAndSuggestions = async () => {
      setFetching(true);
      setPreviousSuggestions([]);
      try {
        // Get logged-in user email from auth
        const { data: { session } } = await supabase.auth.getSession();
        const email = session?.user?.email;
        if (!email) {
          setFetching(false);
          return;
        }
        // Fetch student id from Users Table
        const { data: userRow } = await supabase
          .from("Users Table")
          .select("id")
          .eq("email", email)
          .maybeSingle();

        if (!userRow?.id) {
          setFetching(false);
          return;
        }
        setStudentId(userRow.id);

        // Fetch suggestions for this student
        const { data, error } = await supabase
          .from("Suggestion")
          .select("id, type, text, timestamp, status")
          .eq("student_id", userRow.id)
          .order("timestamp", { ascending: false });

        if (error) {
          toast.error("Failed to load suggestions");
          setFetching(false);
          return;
        }
        const suggestions: SuggestionRow[] = (data || []).map((s) => ({
          id: s.id,
          type: s.type,
          text: s.text,
          date: s.timestamp,
          status: s.status,
        }));
        setPreviousSuggestions(suggestions);
      } catch (err) {
        toast.error("Failed to load your suggestions.");
      } finally {
        setFetching(false);
      }
    };
    fetchStudentIdAndSuggestions();
  }, []);

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
    if (!studentId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert into Suggestion table
      const { error } = await supabase.from("Suggestion").insert({
        // id will auto-increment
        student_id: studentId,
        type: suggestionType,
        text: suggestionText,
        timestamp: new Date().toISOString(),
        status: "Under Review",
      });

      if (error) throw error;

      toast.success("Your suggestion has been submitted anonymously");

      // Reload suggestions after submitting
      setSuggestionType("");
      setSuggestionText("");
      // Refetch suggestions
      const { data } = await supabase
        .from("Suggestion")
        .select("id, type, text, timestamp, status")
        .eq("student_id", studentId)
        .order("timestamp", { ascending: false });
      const suggestions: SuggestionRow[] = (data || []).map((s) => ({
        id: s.id,
        type: s.type,
        text: s.text,
        date: s.timestamp,
        status: s.status,
      }));
      setPreviousSuggestions(suggestions);
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
              {fetching ? (
                <p className="text-gray-500">Loading suggestions...</p>
              ) : previousSuggestions.length === 0 ? (
                <p className="text-gray-500">You haven't submitted any suggestions yet.</p>
              ) : (
                previousSuggestions.map((suggestion) => (
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
                        {suggestion.status ?? "Unknown"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">
                        {suggestion.date ? new Date(suggestion.date).toLocaleDateString() : ""}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        {suggestion.type ?? ""}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Suggestions;
