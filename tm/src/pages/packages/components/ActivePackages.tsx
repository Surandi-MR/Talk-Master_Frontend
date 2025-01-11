import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RootState } from '@/store';

export function ActivePackages() {
  const userPackages = useSelector((state: RootState) => state.packages.userPackages);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Packages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userPackages.map((pkg) => (
            <div key={pkg.id} className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-semibold">{pkg.name}</h3>
                <span className="text-sm text-muted-foreground">
                  {pkg.hours} hours total
                </span>
              </div>
              <Progress value={75} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}