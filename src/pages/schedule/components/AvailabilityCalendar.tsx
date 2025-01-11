import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { TimeSlots } from './TimeSlots';

export function AvailabilityCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
            />
          </div>
          <div className="min-h-0 h-full">
            <TimeSlots date={selectedDate} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}