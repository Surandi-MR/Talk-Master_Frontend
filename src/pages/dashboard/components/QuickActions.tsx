import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function QuickActions() {

  const navigate = useNavigate();
  return (
    <Card className="grid md:grid-cols-2 gap-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Let's Have a Talk!</h2>
        <p className="text-muted-foreground">
          Ready to practice your English? Schedule a session with one of our expert instructors.
        </p>
        <Button className="bg-[#DC2626] hover:bg-[#B91C1C]" onClick={() => navigate('/sessions')}>
          Schedule a Session
        </Button>
      </div>
      <div className="flex justify-center">
        <MessageCircle className="h-40 w-40 text-muted-foreground" />
      </div>
    </Card>
  );
}