import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CredentialsFormProps {
  onPrevious: () => void;
}

export function CredentialsForm({ onPrevious }: CredentialsFormProps) {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" className="bg-white/5" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Choose a Password</Label>
        <Input id="password" type="password" className="bg-white/5" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" type="password" className="bg-white/5" required />
      </div>
      <div className="flex gap-4">
        <Button 
          type="button"
          variant="outline" 
          className="flex-1"
          onClick={() => {
            const form = document.querySelector('form');
            if (form) form.reset();
          }}
        >
          Clear
        </Button>
        <Button type="submit" className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C]">
          Submit
        </Button>
      </div>
    </form>
  );
}