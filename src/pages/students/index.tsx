import { useState } from 'react';
import { StudentCard } from './components/StudentCard';
import { StudentDetailsDialog } from './components/StudentDetailsDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

// Mock data for demonstration
const MOCK_STUDENTS = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone_no: '+1234567890',
    gender: 'Male',
    joinedDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    sessions: [
      { id: '1', date: '2024-03-15', instructor: 'Sarah Johnson', status: 'Completed' },
      { id: '2', date: '2024-03-18', instructor: 'Michael Chen', status: 'Scheduled' },
    ],
    packages: [
      {
        id: '1',
        name: 'Premium Package',
        description: '20 hours of English sessions',
        purchasedDate: '2024-02-01',
        remainingSessions: 15,
      },
    ],
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone_no: '+1987654321',
    gender: 'Female',
    joinedDate: '2024-02-01',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    sessions: [
      { id: '3', date: '2024-03-16', instructor: 'Emma Williams', status: 'Completed' },
      { id: '4', date: '2024-03-19', instructor: 'Sarah Johnson', status: 'Scheduled' },
    ],
    packages: [
      {
        id: '2',
        name: 'Basic Package',
        description: '10 hours of English sessions',
        purchasedDate: '2024-02-15',
        remainingSessions: 8,
      },
    ],
  },
];

interface AddStudentFormData {
  firstName: string;
  lastName: string;
  email: string;
}

export function Students() {
  const [selectedStudent, setSelectedStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState<AddStudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleViewDetails = (studentId: string) => {
    const student = MOCK_STUDENTS.find(s => s.id === studentId);
    if (student) {
      setSelectedStudent(student);
      setIsDetailsOpen(true);
    }
  };

  const handleCreate = () => {
    axiosInstance
      .post("/api/user/create", { ...formData, role: "STUDENT" })
      .then(() => {
        toast.success(
          "Registration successful! Generated password is sent to the email provided."
        );
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
    setIsAddOpen(false);
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button 
          className="bg-[#DC2626] hover:bg-[#B91C1C]"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_STUDENTS.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {selectedStudent && (
        <StudentDetailsDialog
          student={selectedStudent}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
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