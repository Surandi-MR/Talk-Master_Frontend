import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import type { Session } from '@/types';

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{session.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4" />
            <span>{session.startTime} - {session.endTime}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="mr-2 h-4 w-4" />
            <span>Instructor ID: {session.instructorId}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Reschedule</Button>
          <Button variant="destructive" size="sm">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}