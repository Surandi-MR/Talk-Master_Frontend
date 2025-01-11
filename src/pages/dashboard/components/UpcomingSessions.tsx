import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

export function UpcomingSessions() {
  const sessions = [
    {
      id: 1,
      date: 'March 21, 2024',
      time: '10:00 AM',
      instructor: 'Sarah Johnson',
    },
    {
      id: 2,
      date: 'March 23, 2024',
      time: '2:00 PM',
      instructor: 'Michael Chen',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center space-x-4 rounded-lg border p-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{session.time}</span>
                </div>
                <p className="text-sm font-medium">
                  Instructor: {session.instructor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}