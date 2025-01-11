import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MessageSquare, User } from 'lucide-react';
import type { Session } from '@/types';

interface HistoryCardProps {
  session: Session;
}

export function HistoryCard({ session }: HistoryCardProps) {
  return (
    <Card>
      <CardContent className="grid gap-4 p-4 md:grid-cols-[1fr_auto]">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
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
          {session.feedback && (
            <div className="flex items-start text-sm">
              <MessageSquare className="mr-2 h-4 w-4 mt-0.5" />
              <p className="text-muted-foreground">{session.feedback}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}