import { useState, useEffect } from "react";
import { StudentCard } from "./components/StudentCard";
import { StudentDetailsDialog } from "./components/StudentDetailsDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setStudents } from "@/store/slices/studentsSlice";

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

interface AddStudentFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
}

export function Students() {
  const dispatch = useDispatch();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  ); // Changed to store ID only
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState<AddStudentFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const students = useSelector(
    (state: RootState) => state.students.students
  ) as Student[];

  useEffect(() => {
    // Fetch students data from API
    axiosInstance
      .get(`/api/user/role/STUDENT`)
      .then((response) => {
        dispatch(setStudents(response.data));
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch students. Please try again.");
      });
  }, [dispatch]);

  const handleViewDetails = (studentId: string) => {
    // Just set the student ID and open the dialog
    setSelectedStudentId(studentId);
    setIsDetailsOpen(true);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {
      firstName: "",
      lastName: "",
      email: "",
    };

    let isValid = true;

    // First name validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    } else if (formData.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
      isValid = false;
    } else if (formData.firstName.length > 50) {
      errors.firstName = "First name cannot exceed 50 characters";
      isValid = false;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    } else if (formData.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
      isValid = false;
    } else if (formData.lastName.length > 50) {
      errors.lastName = "Last name cannot exceed 50 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleCreate = () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    axiosInstance
      .post("/api/user/create", { ...formData, role: "STUDENT" })
      .then(() => {
        toast.success(
          "Registration successful! Generated password is sent to the email provided."
        );
        // Optionally, refetch the student list after creating a new student
        axiosInstance.get(`/api/user/role/STUDENT`).then((response) => {
          dispatch(setStudents(response.data));
        });
        setIsAddOpen(false);
        setFormData({ firstName: "", lastName: "", email: "" });
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
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset form state when dialog closes
      setFormData({ firstName: "", lastName: "", email: "" });
      setFormErrors({ firstName: "", lastName: "", email: "" });
    }
    setIsAddOpen(open);
  };

  const handleInputChange = (
    field: keyof AddStudentFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field as user types
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
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
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {selectedStudentId && (
        <StudentDetailsDialog
          studentId={selectedStudentId}
          open={isDetailsOpen}
          onOpenChange={(open) => {
            setIsDetailsOpen(open);
            if (!open) setSelectedStudentId(null);
          }}
        />
      )}

      <Dialog open={isAddOpen} onOpenChange={handleDialogClose}>
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
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  aria-invalid={!!formErrors.firstName}
                  aria-describedby={
                    formErrors.firstName ? "firstName-error" : undefined
                  }
                  disabled={isSubmitting}
                />
                {formErrors.firstName && (
                  <p
                    id="firstName-error"
                    className="text-sm font-medium text-red-500"
                  >
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  aria-invalid={!!formErrors.lastName}
                  aria-describedby={
                    formErrors.lastName ? "lastName-error" : undefined
                  }
                  disabled={isSubmitting}
                />
                {formErrors.lastName && (
                  <p
                    id="lastName-error"
                    className="text-sm font-medium text-red-500"
                  >
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
                disabled={isSubmitting}
              />
              {formErrors.email && (
                <p
                  id="email-error"
                  className="text-sm font-medium text-red-500"
                >
                  {formErrors.email}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleDialogClose(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#DC2626] hover:bg-[#B91C1C]"
              onClick={handleCreate}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
