import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { TimeSlotSelect } from './TimeSlotSelect';
import { AvailableInstructors } from './AvailableInstructors';

export function ScheduleSession() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [showInstructors, setShowInstructors] = useState(false);

  const handleFindInstructor = () => {
    if (date && time) {
      setShowInstructors(true);
    }
  };

  const handleSchedule = (instructorId: string) => {
    console.log('Scheduling with instructor:', instructorId, 'for', date, 'at', time);
    // Here you would typically make an API call to schedule the session
  };

  // Get today's date at the start of the day
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Session</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < today}
              fromDate={today}
            />
          </div>
          <div className="flex-1 space-y-4">
            <TimeSlotSelect value={time} onValueChange={setTime} />
            <Button 
              className="w-full bg-[#DC2626] hover:bg-[#B91C1C]"
              onClick={handleFindInstructor}
              disabled={!date || !time}
            >
              Find Instructors
            </Button>
          </div>
        </div>

        {showInstructors && (
          <AvailableInstructors onSchedule={handleSchedule} />
        )}
      </CardContent>
    </Card>
  );
}