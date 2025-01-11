import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function PackageOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Package</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Premium Package</h3>
            <p className="text-sm text-muted-foreground">20 hours total</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>15.5 hours remaining</span>
              <span>77.5%</span>
            </div>
            <Progress value={77.5} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}