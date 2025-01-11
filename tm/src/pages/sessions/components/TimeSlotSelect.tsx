import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateTimeSlots } from '@/lib/utils/time';

interface TimeSlotSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
}

export function TimeSlotSelect({ value, onValueChange }: TimeSlotSelectProps) {
  const timeSlots = generateTimeSlots();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Time</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select time slot" />
        </SelectTrigger>
        <SelectContent>
          {timeSlots.map((slot) => (
            <SelectItem key={slot} value={slot}>
              {slot}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}