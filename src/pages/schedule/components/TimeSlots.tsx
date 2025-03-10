import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Eye, Clock } from "lucide-react";
import { ISession } from "./AvailabilityCalendar";
// import { useState } from "react";

interface TimeSlotsProps {
  sessions: ISession[];
  date: Date;
  onTakeLeave?: (time: string) => void;
  onSetAvailable?: (time: string) => void;
  onViewSession?: (session: ISession) => void;
}

type SlotStatus = "available" | "leave" | "scheduled";

interface TimeSlot {
  time: string;
  displayTime: string;
  status: SlotStatus;
  session?: ISession;
}

export function TimeSlots({
  date,
  sessions,
  onTakeLeave,
  onSetAvailable,
  onViewSession,
}: TimeSlotsProps) {
  // const [showDetails, setShowDetails] = useState(false);
  // const [selectedSession, setSelectedSession] = useState<ISession | null>(null);

  // Generate time slots from 6 AM to midnight in 30-minute intervals
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const sessionDate = format(date, "yyyy-MM-dd");

    for (let hour = 6; hour < 24; hour++) {
      for (const minute of [0, 30]) {
        // Create the time string in the same format as the session time
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const isoTimeString = `${sessionDate}T${timeString}:00`;
        const displayTime = `${hour % 12 || 12}:${minute
          .toString()
          .padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;

        // Find a session at this time slot
        const matchingSession = sessions.find((session) => {
          const sessionTime = new Date(session.time);
          return format(sessionTime, "yyyy-MM-dd'T'HH:mm:00") === isoTimeString;
        });

        let status: SlotStatus = "leave"; // Default status

        if (matchingSession) {
          status =
            matchingSession.status === "SCHEDULED" ? "scheduled" : "available";
        }

        slots.push({
          time: isoTimeString,
          displayTime,
          status,
          session: matchingSession,
        });
      }
    }

    return slots;
  };

  const slots = generateTimeSlots();

  const handleTakeLeave = (time: string) => {
    console.log("Taking leave for:", time);
    if (onTakeLeave) onTakeLeave(time);
  };

  const handleSetAvailable = (time: string) => {
    console.log("Setting available for:", time);
    if (onSetAvailable) onSetAvailable(time);
  };

  const handleViewSession = (session: ISession) => {
    // setSelectedSession(session);
    // setShowDetails(true);
    if (onViewSession) onViewSession(session);
  };

  // const closeDetails = () => {
  //   setShowDetails(false);
  //   setSelectedSession(null);
  // };

  const getSlotButton = (slot: TimeSlot) => {
    switch (slot.status) {
      case "available":
        return (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto text-yellow-600 hover:text-yellow-700"
            onClick={() => handleTakeLeave(slot.time)}
          >
            Take Leave
          </Button>
        );
      case "leave":
        return (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto text-green-600 hover:text-green-700"
            onClick={() => handleSetAvailable(slot.time)}
          >
            Set Available
          </Button>
        );
      case "scheduled":
        return (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto text-blue-600 hover:text-blue-700"
            onClick={() => slot.session && handleViewSession(slot.session)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Session
          </Button>
        );
    }
  };

  const getStatusColor = (status: SlotStatus) => {
    switch (status) {
      case "available":
        return "bg-green-50 border-green-200";
      case "leave":
        return "bg-yellow-50 border-yellow-200";
      case "scheduled":
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-4 w-4" />
        <span className="font-medium">
          {format(date, "EEEE, MMMM d, yyyy")}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid gap-2">
          {slots.map((slot) => (
            <div
              key={slot.time}
              className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(
                slot.status
              )}`}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{slot.displayTime}</span>
                <span className="text-sm text-gray-500 capitalize">
                  • {slot.status}
                </span>
              </div>
              {getSlotButton(slot)}
            </div>
          ))}
        </div>
      </div>

      {/* {showDetails && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Session Details</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Time:</span>{" "}
                {format(new Date(selectedSession.time), "h:mm a, MMMM d, yyyy")}
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                {selectedSession.status}
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
              {selectedSession.topic && (
                <div>
                  <span className="font-medium">Topic:</span>{" "}
                  {selectedSession.topic}
                </div>
              )}
              {selectedSession.meetingLink && (
                <div>
                  <span className="font-medium">Meeting Link:</span>{" "}
                  {selectedSession.meetingLink}
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={closeDetails}>Close</Button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
