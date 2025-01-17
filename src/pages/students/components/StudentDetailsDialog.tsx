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

interface StudentDetailsDialogProps {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone_no: string;
    gender: string;
    joinedDate: string;
    sessions: Array<{
      id: string;
      date: string;
      instructor: string;
      status: string;
    }>;
    packages: Array<{
      id: string;
      name: string;
      description: string;
      purchasedDate: string;
      remainingSessions: number;
    }>;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentDetailsDialog({ student, open, onOpenChange }: StudentDetailsDialogProps) {
  const handleDeactivate = () => {
    // Here you would typically make an API call to deactivate the student
    console.log('Deactivating student:', student.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {student.firstName} {student.lastName}</p>
                <p><span className="font-medium">Email:</span> {student.email}</p>
                <p><span className="font-medium">Phone:</span> {student.phone_no}</p>
                <p><span className="font-medium">Gender:</span> {student.gender}</p>
                <p><span className="font-medium">Joined Date:</span> {format(new Date(student.joinedDate), 'PPP')}</p>
              </div>
            </div>
          </div>

          {/* Sessions Table */}
          <div>
            <h3 className="font-semibold mb-2">Sessions</h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{format(new Date(session.date), 'PPP')}</TableCell>
                      <TableCell>{session.instructor}</TableCell>
                      <TableCell>{session.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Packages Table */}
          <div>
            <h3 className="font-semibold mb-2">Packages</h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Purchased Date</TableHead>
                    <TableHead>Remaining Sessions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.name}</TableCell>
                      <TableCell>{pkg.description}</TableCell>
                      <TableCell>{format(new Date(pkg.purchasedDate), 'PPP')}</TableCell>
                      <TableCell>{pkg.remainingSessions}</TableCell>
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