import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

interface CredentialsFormProps {
  userDetails: { [key: string]: string };
}

export function CredentialsForm({ userDetails }: CredentialsFormProps) {
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    ).value;

    if (!password || password.length < 5) {
      toast.error("Password must be at least 4 characters!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const data = { ...userDetails, password };

    try {
      await axios.post("http://localhost:8080/register", data);

      toast.success("Registration successful!");
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="password">Choose a Password</Label>
        <Input id="password" type="password" className="bg-white/5" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          className="bg-white/5"
          required
        />
      </div>
      <div className="flex gap-4">
        <Button
          type="reset"
          variant="outline"
          className="flex-1 text-[#0A192F] hover:bg-slate-300"
        >
          Clear
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C]"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
