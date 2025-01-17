import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface InstructorDetailsDialogProps {
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone_no: string;
    gender: string;
    joinedDate: string;
    avatar: string;
    rating: number;
    totalSessions: number;
    completedSessions: number;
    upcomingSessions: Array<{
      id: string;
      date: string;
      student: string;
      time: string;
    }>;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstructorDetailsDialog({ instructor, open, onOpenChange }: InstructorDetailsDialogProps) {
  const handleDeactivate = () => {
    // Here you would typically make an API call to deactivate the instructor
    console.log('Deactivating instructor:', instructor.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Instructor Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {instructor.firstName} {instructor.lastName}</p>
                <p><span className="font-medium">Email:</span> {instructor.email}</p>
                <p><span className="font-medium">Phone:</span> {instructor.phone_no}</p>
                <p><span className="font-medium">Gender:</span> {instructor.gender}</p>
                <p><span className="font-medium">Joined Date:</span> {format(new Date(instructor.joinedDate), 'PPP')}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Performance</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Rating:</span> {instructor.rating}/5.0</p>
                <p><span className="font-medium">Total Sessions:</span> {instructor.totalSessions}</p>
                <p><span className="font-medium">Completed Sessions:</span> {instructor.completedSessions}</p>
              </div>
            </div>
          </div>

          {/* Upcoming Sessions Table */}
          <div>
            <h3 className="font-semibold mb-2">Upcoming Sessions</h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Student</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instructor.upcomingSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{format(new Date(session.date), 'PPP')}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>{session.student}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="destructive"
            onClick={handleDeactivate}
          >
            Deactivate Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}