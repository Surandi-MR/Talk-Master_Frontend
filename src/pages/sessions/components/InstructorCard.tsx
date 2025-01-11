import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface InstructorCardProps {
  instructor: {
    id: string;
    name: string;
    image?: string;
    rating: number;
  };
  onSchedule: (instructorId: string) => void;
}

export function InstructorCard({ instructor, onSchedule }: InstructorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={instructor.image} alt={instructor.name} />
            <AvatarFallback>{instructor.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{instructor.name}</h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm">{instructor.rating.toFixed(1)}</span>
            </div>
          </div>
          <Button 
            className="bg-[#DC2626] hover:bg-[#B91C1C]"
            onClick={() => onSchedule(instructor.id)}
          >
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}