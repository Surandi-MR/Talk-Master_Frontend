import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { TimeSlots } from "./TimeSlots";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import axiosInstance from "@/lib/axiosInstance";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_no: string;
  birthday: string;
  password: string;
  role: string;
  createdAt: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_no: string;
  birthday: string | null;
  password: string;
  role: string;
  createdAt: string;
}

export interface ISession {
  id: string;
  studentId: string | null;
  instructorId: string;
  time: string;
  status: string;
  topic: string | null;
  meetingLink: string | null;
  studdent: Student | null;
  instructor: Instructor;
}

export function AvailabilityCalendar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedSession, setSelectedSession] = useState<ISession | null>(null);
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSessions = () => {
    if (!user?.id) return;

    setIsLoading(true);

    // Format the date properly using date-fns to ensure consistency
    const dateString = format(selectedDate, "yyyy-MM-dd");

    // Set the time range for the selected date (from 00:00 to 23:59:59)
    const startTimeStr = `${dateString}T00:00:00`;
    const endTimeStr = `${dateString}T23:59:59`;

    console.log("Fetching sessions for", startTimeStr, "to", endTimeStr);

    axiosInstance
      .get(`/api/sessions`, {
        params: {
          instructorId: user.id,
          startTime: startTimeStr,
          endTime: endTimeStr,
        },
      })
      .then((response) => {
        console.log("Sessions fetched:", response.data);
        setSessions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        toast.error("Failed to fetch sessions. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchSessions();
  }, [user, selectedDate]);

  const handleTakeLeave = (time: string) => {
    // Find the session for the given time
    const session = sessions.find((s) => s.time === time);

    if (!session) {
      console.error("No session found for time:", time);
      toast.error("No session found for the selected time.");
      return;
    }

    setIsActionLoading(true);

    // Call the delete API endpoint with the session ID
    axiosInstance
      .delete(`/api/sessions/${session.id}`)
      .then(() => {
        console.log("Successfully deleted session:", session.id);
        toast.success("Successfully took leave for the selected time.");
        // Refresh the sessions data
        fetchSessions();
      })
      .catch((error) => {
        console.error("Error deleting session:", error);
        toast.error("Failed to take leave for the selected time.");
      })
      .finally(() => {
        setIsActionLoading(false);
      });
  };

  const handleSetAvailable = (time: string) => {
    if (!user?.id) {
      toast.error("User not found. Please try logging in again.");
      return;
    }

    setIsActionLoading(true);

    // Create request body according to the required format
    const requestBody = {
      instructorId: user.id,
      time: time,
      status: "AVAILABLE",
    };

    console.log("Setting available with data:", requestBody);

    // Call the POST API endpoint to create a new session
    axiosInstance
      .post(`/api/sessions`, requestBody)
      .then((response) => {
        console.log("Successfully set available:", response.data);
        toast.success("Successfully set time slot as available.");
        // Refresh the sessions data
        fetchSessions();
      })
      .catch((error) => {
        console.error("Error setting available:", error);
        toast.error("Failed to set time slot as available.");
      })
      .finally(() => {
        setIsActionLoading(false);
      });
  };

  const handleViewSession = (session: ISession) => {
    setSelectedSession(session);
    setMeetingLink(session.meetingLink || "");
    setTopic(session.topic || "");
    setStatus(session.status);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedSession(null);
    setMeetingLink("");
    setTopic("");
    setStatus("");
  };

  const handleSubmitSessionDetails = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSession) return;

    setIsSubmitting(true);

    const requestBody = {
      meetingLink: meetingLink,
      topic: topic,
      status: status,
    };

    axiosInstance
      .put(`/api/sessions/${selectedSession.id}`, requestBody)
      .then((response) => {
        console.log("Successfully updated session:", response.data);
        toast.success("Successfully updated session details.");
        fetchSessions();
        closeDetails();
      })
      .catch((error) => {
        console.error("Error updating session:", error);
        toast.error("Failed to update session details.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle>Availability Calendar</CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-[calc(100%-4rem)]">
        <div className="grid h-full gap-6 md:grid-cols-[300px_1fr]">
          <div className="flex flex-col">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              disabled={isActionLoading}
            />
          </div>
          <div className="min-h-0 h-full">
            {isLoading || isActionLoading ? (
              <div className="flex items-center justify-center h-full">
                <p>
                  {isActionLoading ? "Processing..." : "Loading sessions..."}
                </p>
              </div>
            ) : (
              <TimeSlots
                date={selectedDate}
                sessions={sessions}
                onTakeLeave={handleTakeLeave}
                onSetAvailable={handleSetAvailable}
                onViewSession={handleViewSession}
              />
            )}
          </div>
        </div>
      </CardContent>

      {/* Session Details Modal */}
      {showDetails && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Session Details</h3>

            <div className="space-y-4">
              <div>
                <span className="font-medium">Time:</span>{" "}
                {format(new Date(selectedSession.time), "h:mm a, MMMM d, yyyy")}
              </div>

              {selectedSession.studdent && (
                <div>
                  <span className="font-medium">Student:</span>{" "}
                  {selectedSession.studdent.firstName}{" "}
                  {selectedSession.studdent.lastName}
                </div>
              )}
              {selectedSession.instructor && (
                <div>
                  <span className="font-medium">Instructor:</span>{" "}
                  {selectedSession.instructor.firstName}{" "}
                  {selectedSession.instructor.lastName}
                </div>
              )}

              {/* We now show the form for all sessions */}
              <form
                onSubmit={handleSubmitSessionDetails}
                className="space-y-4 mt-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SCHEDULED">SCHEDULED</SelectItem>
                      <SelectItem value="CANCELED">CANCELED</SelectItem>
                      <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                      {selectedSession.status === "AVAILABLE" && (
                        <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter session topic"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meetingLink">Meeting Link</Label>
                  <Input
                    id="meetingLink"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder="Enter meeting link"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeDetails}
                    disabled={isSubmitting}
                  >
                    Close
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
