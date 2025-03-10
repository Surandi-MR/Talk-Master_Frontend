import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { TimeSlotSelect } from './TimeSlotSelect';
import { AvailableInstructors } from './AvailableInstructors';
import axiosInstance from '@/lib/axiosInstance';
import { format } from "date-fns";
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { addSession } from '@/store/slices/sessionSlice';

export function ScheduleSession() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [showInstructors, setShowInstructors] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleFindInstructor = async () => {
    if (date && time) {
      const dateString = format(date, "yyyy-MM-dd");
      const [hours, minutes] = time.split(':');
      const startTimeStr = `${dateString}T${hours}:${minutes}:00`;
      // startTime.setHours(parseInt(hours), parseInt(minutes));

      try {
        axiosInstance.get(`/api/sessions?status=AVAILABLE&startTime=${startTimeStr}`)
          .then((response) => {
            setInstructors(response.data);
            setShowInstructors(true);
          });
      } catch (error) {
        console.error('Error fetching instructors:', error);
        toast.error('Error fetching instructors');
      }
    }
  };

  const handleSchedule = (instructorId: string) => {
    console.log('Scheduling with instructor:', instructorId, 'for', date, 'at', time);
    
    if (user) {
      const requestBody = {
        studentId: user.id,
        status: "SCHEDULED"
      };

      axiosInstance.put(`/api/sessions/schedule/${instructorId}`, requestBody)
        .then((response) => {
          console.log('Session scheduled successfully:', response.data);
          toast.success('Session scheduled successfully');
          setShowInstructors(false);
          setInstructors([]);
          dispatch(addSession(response
            .data));
        })
        .catch((error) => {
          console.error('Error scheduling session:', error);
          const errorMessage = error.response?.data?.error || 'Error scheduling session';
          toast.error(errorMessage);
        });
    } else {
      console.error('User is not logged in');
      toast.error('Please log in to schedule a session');
    }
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
          <AvailableInstructors instructors={instructors} onSchedule={handleSchedule} />
        )}
      </CardContent>
    </Card>
  );
}