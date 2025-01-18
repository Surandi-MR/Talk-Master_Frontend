import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface RegisterFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUserDetails: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function RegisterForm({ setStep, setUserDetails }: RegisterFormProps) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    birthday: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone_no, birthday } = formValues;

    if (!firstName || !lastName || !email || !phone_no || !birthday) {
      toast.error("All fields are required!");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email address!");
      return false;
    }

    if (!/^\d{10}$/.test(phone_no)) {
      toast.error("Phone number must be 10 digits!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setUserDetails(formValues);
      setStep(2);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">Create Your Account</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            className="bg-white/5"
            value={formValues.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            className="bg-white/5"
            value={formValues.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          className="bg-white/5"
          value={formValues.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone_no">Phone Number</Label>
        <Input
          id="phone_no"
          type="tel"
          className="bg-white/5"
          value={formValues.phone_no}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthday">Birthday</Label>
        <Input
          id="birthday"
          type="date"
          className="bg-white/5"
          value={formValues.birthday}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full bg-[#DC2626] hover:bg-[#B91C1C]">
        NEXT →
      </Button>
    </form>
  );
}
