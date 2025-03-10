import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "sonner";

// Define the structure of the detailed student (matching the backend DTO)
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_no: string;
  birthday: string;
  password: string;
  role: string;
  createdAt: string;
}

interface Session {
  id: string;
  studentId: string;
  instructorId: string;
  time: string;
  status: string;
  topic: string | null;
  meetingLink: string | null;
  studdent: User;
  instructor: User;
}

interface PackageModel {
  id: string;
  name: string;
  price: number;
  sessions: number;
  description: string;
}

interface UserPackage {
  id: string;
  userId: string;
  packageId: string;
  purchaseDate: string;
  remainingSessions: number;
  packageModel: PackageModel;
}

interface DetailedStudentResponse {
  user: User;
  sessions: Session[];
  packages: UserPackage[];
}

interface StudentDetailsDialogProps {
  studentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentDetailsDialog({
  studentId,
  open,
  onOpenChange,
}: StudentDetailsDialogProps) {
  const [studentData, setStudentData] =
    useState<DetailedStudentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      // Fetch detailed student data when the dialog is opened
      setLoading(true);
      setError(null);
      axiosInstance
        .get(`/api/user/${studentId}`)
        .then((response) => {
          setStudentData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch student details. Please try again.");
          setLoading(false);
        });
    }
  }, [studentId, open]);

  // const handleDeactivate = () => {
  //   // Make an API call to deactivate the student
  //   axiosInstance
  //     .put(`/api/user/${studentId}/deactivate`) // Adjust the endpoint as needed
  //     .then(() => {
  //       toast.success("Student account deactivated successfully.");
  //       onOpenChange(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error("Failed to deactivate student account. Please try again.");
  //     });
  // };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!studentData) {
    return null; // Or handle this case as needed
  }

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
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {studentData.user.firstName} {studentData.user.lastName}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {studentData.user.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {studentData.user.phone_no}
                </p>
                <p>
                  <span className="font-medium">Birthday:</span>{" "}
                  {studentData.user.birthday && format(
                    new Date(studentData.user.birthday),
                    "PPP"
                  )}
                </p>
                <p>
                  <span className="font-medium">Joined Date:</span>{" "}
                  {format(new Date(studentData.user.createdAt), "PPP")}
                </p>
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
                  {studentData.sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        {format(new Date(session.time), "PPP")}
                      </TableCell>
                      <TableCell>{`${session.instructor.firstName} ${session.instructor.lastName}`}</TableCell>
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
                  {studentData.packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.packageModel.name}</TableCell>
                      <TableCell>{pkg.packageModel.description}</TableCell>
                      <TableCell>
                        {format(new Date(pkg.purchaseDate), "PPP")}
                      </TableCell>
                      <TableCell>{pkg.remainingSessions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter>
          {/* <Button variant="destructive" onClick={handleDeactivate}>
            Deactivate Account
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
