import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Pencil, Trash } from 'lucide-react';
import type { Package } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface PackageCardProps {
  package: Package;
  onActivate?: (packageId: string) => void;
  onEdit?: (pkg: Package) => void;
  onDelete?: (packageId: string) => void;
}

export function PackageCard({ package: pkg, onActivate, onEdit, onDelete }: PackageCardProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl">{pkg.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="text-3xl font-bold">${pkg.price}</div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>12 Sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{pkg.hours} Hours Total</span>
          </div>
        </div>

        <p className="text-muted-foreground">{pkg.description}</p>
      </CardContent>
      <CardFooter>
        {isAdmin ? (
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => onEdit?.(pkg)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="destructive"
              className="flex-1"
              onClick={() => onDelete?.(pkg.id)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full bg-[#4ade80] hover:bg-[#22c55e]"
            onClick={() => onActivate?.(pkg.id)}
          >
            Activate Package
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}