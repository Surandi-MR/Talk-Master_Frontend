import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, Plus } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

// Mock data for demonstration
const MOCK_INSTRUCTORS = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone_no: '+1234567890',
    gender: 'Female',
    joinedDate: '2024-01-10',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.8,
    totalSessions: 156,
    completedSessions: 150,
    upcomingSessions: [
      { id: '1', date: '2024-03-20', student: 'John Doe', time: '10:00 AM' },
      { id: '2', date: '2024-03-21', student: 'Jane Smith', time: '2:00 PM' },
    ],
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@example.com',
    phone_no: '+1987654321',
    gender: 'Male',
    joinedDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 4.9,
    totalSessions: 142,
    completedSessions: 138,
    upcomingSessions: [
      { id: '3', date: '2024-03-20', student: 'Alice Brown', time: '3:00 PM' },
      { id: '4', date: '2024-03-22', student: 'Bob Wilson', time: '11:00 AM' },
    ],
  },
];

interface InstructorDetailsDialogProps {
  instructor: typeof MOCK_INSTRUCTORS[0];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AddInstructorFormData {
  firstName: string;
  lastName: string;
  email: string;
}

function InstructorDetailsDialog({ instructor, open, onOpenChange }: InstructorDetailsDialogProps) {
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
      </DialogContent>
    </Dialog>
  );
}

export function Instructors() {
  const [selectedInstructor, setSelectedInstructor] = useState<typeof MOCK_INSTRUCTORS[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState<AddInstructorFormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleViewDetails = (instructorId: string) => {
    const instructor = MOCK_INSTRUCTORS.find(i => i.id === instructorId);
    if (instructor) {
      setSelectedInstructor(instructor);
      setIsDetailsOpen(true);
    }
  };

  const handleCreate = () => {
    // Here you would typically make an API call to create the instructor
    console.log('Creating instructor:', formData);
    setIsAddOpen(false);
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Instructors</h1>
        <Button 
          className="bg-[#DC2626] hover:bg-[#B91C1C]"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Instructor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_INSTRUCTORS.map((instructor) => (
          <Card key={instructor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={instructor.avatar} alt={`${instructor.firstName} ${instructor.lastName}`} />
                  <AvatarFallback>{instructor.firstName[0]}{instructor.lastName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{instructor.firstName} {instructor.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{instructor.email}</p>
                  <p className="text-sm font-medium text-yellow-600">★ {instructor.rating}</p>
                </div>
                <Button 
                  className="w-full bg-[#DC2626] hover:bg-[#B91C1C]"
                  onClick={() => handleViewDetails(instructor.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedInstructor && (
        <InstructorDetailsDialog
          instructor={selectedInstructor}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Instructor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#DC2626] hover:bg-[#B91C1C]"
              onClick={handleCreate}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}