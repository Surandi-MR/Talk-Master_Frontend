import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner"; // Assuming you're using Sonner for notifications

interface RegisterFormProps {
  onNext: () => void;
  setUserDetails: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function RegisterForm({ onNext, setUserDetails }: RegisterFormProps) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    gender: "male",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone_no } = formValues;

    if (!firstName || !lastName || !email || !phone_no) {
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
      onNext();
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
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            className="bg-white/5"
            value={formValues.lastName}
            onChange={handleChange}
            required
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
          required
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
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Gender</Label>
        <RadioGroup
          value={formValues.gender}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormValues((prev) => ({ ...prev, gender: e.target.value }))
          }
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full bg-[#DC2626] hover:bg-[#B91C1C]">
        NEXT →
      </Button>
    </form>
  );
}
