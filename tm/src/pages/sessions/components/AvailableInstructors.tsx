import { Card, CardContent } from '@/components/ui/card';
import { InstructorCard } from './InstructorCard';

// Mock data for demonstration
const MOCK_INSTRUCTORS = [
  { id: '1', name: 'Sarah Johnson', rating: 4.8, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
  { id: '2', name: 'Michael Chen', rating: 4.9, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
  { id: '3', name: 'Emma Williams', rating: 4.7, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
];

interface AvailableInstructorsProps {
  onSchedule: (instructorId: string) => void;
}

export function AvailableInstructors({ onSchedule }: AvailableInstructorsProps) {
  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold">Available Instructors</h3>
      <div className="space-y-4">
        {MOCK_INSTRUCTORS.map((instructor) => (
          <InstructorCard
            key={instructor.id}
            instructor={instructor}
            onSchedule={onSchedule}
          />
        ))}
      </div>
    </div>
  );
}