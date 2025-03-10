import { Card, CardContent } from "@/components/ui/card";
// import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Contact, Link } from "lucide-react";
import { format } from "date-fns";

interface SessionCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{format(new Date(session.time), " MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4" />
            <span>{format(new Date(session.time), "h:mm a")}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="mr-2 h-4 w-4" />
            <span>
              Instructor : {session.instructor.firstName}{" "}
              {session.instructor.lastName}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Contact className="mr-2 h-4 w-4" />
            <span>Contact : {session.instructor.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Link className="mr-2 h-4 w-4" />
            <span>
              Meeting link :{" "}
              <a
                href={session.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {session.meetingLink}
              </a>
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline" size="sm">Reschedule</Button>
          <Button variant="destructive" size="sm">Cancel</Button> */}
        </div>
      </CardContent>
    </Card>
  );
}
