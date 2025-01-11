import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar, Eye, Clock } from 'lucide-react';

interface TimeSlotsProps {
  date: Date;
}

type SlotStatus = 'available' | 'leave' | 'scheduled';

interface TimeSlot {
  time: string;
  status: SlotStatus;
  sessionId?: string;
}

export function TimeSlots({ date }: TimeSlotsProps) {
  // Generate time slots from 6 AM to midnight in 30-minute intervals
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 6; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        // Randomly assign status for demonstration
        const statuses: SlotStatus[] = ['available', 'leave', 'scheduled'];
        const status = statuses[Math.floor(Math.random() * 3)];
        slots.push({ time, status, sessionId: status === 'scheduled' ? 'session-1' : undefined });
      }
    }
    return slots;
  };

  const slots = generateTimeSlots();

  const handleTakeLeave = (time: string) => {
    console.log('Taking leave for:', time);
  };

  const handleSetAvailable = (time: string) => {
    console.log('Setting available for:', time);
  };

  const handleViewSession = (sessionId: string) => {
    console.log('Viewing session:', sessionId);
  };

  const getSlotButton = (slot: TimeSlot) => {
    switch (slot.status) {
      case 'available':
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
      case 'leave':
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
      case 'scheduled':
        return (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto text-blue-600 hover:text-blue-700"
            onClick={() => handleViewSession(slot.sessionId!)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Session
          </Button>
        );
    }
  };

  const getStatusColor = (status: SlotStatus) => {
    switch (status) {
      case 'available':
        return 'bg-green-50 border-green-200';
      case 'leave':
        return 'bg-yellow-50 border-yellow-200';
      case 'scheduled':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-4 w-4" />
        <span className="font-medium">
          {format(date, 'EEEE, MMMM d, yyyy')}
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
                <span>{slot.time}</span>
                <span className="text-sm text-gray-500 capitalize">• {slot.status}</span>
              </div>
              {getSlotButton(slot)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}