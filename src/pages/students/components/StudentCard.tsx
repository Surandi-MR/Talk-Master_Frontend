import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_no: string;
  birthday: string; 
  role: string;
  created_at: string;
}

interface StudentCardProps {
  student: Student;
  onViewDetails: (studentId: string) => void;
}

export function StudentCard({ student, onViewDetails }: StudentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar - Using a placeholder since avatar is not in the Student interface */}
          <Avatar className="h-24 w-24">
            {/* <AvatarImage
              src={student.avatar}
              alt={`${student.firstName} ${student.lastName}`}
            /> */}
            <AvatarFallback>
              {student.firstName[0]}
              {student.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">
              {student.firstName} {student.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
          <Button
            className="w-full bg-[#DC2626] hover:bg-[#B91C1C]"
            onClick={() => onViewDetails(student.id)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
