import { InstructorCard } from "./InstructorCard";

interface AvailableInstructorsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instructors: any[];
  onSchedule: (instructorId: string) => void;
}

export function AvailableInstructors({
  instructors,
  onSchedule,
}: AvailableInstructorsProps) {
  {if (instructors.length === 0) {
    return (
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold bg-red-500 p-5 text-cyan-50">No instructors available for the selected time and date</h3>
      </div>
    );
  }else{
    return (
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold">Available Instructors</h3>
        <div className="space-y-4">
          {instructors.map((instructor) => (
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
  }
}
