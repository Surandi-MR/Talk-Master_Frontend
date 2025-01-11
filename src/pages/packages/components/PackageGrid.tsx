import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageCard } from './PackageCard';
import { mockPackages } from '@/data/mockPackages';

export function PackageGrid() {
  const handleActivate = (packageId: string) => {
    // Handle package activation
    console.log('Activating package:', packageId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activate a Package</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {mockPackages.map((pkg) => (
            <PackageCard 
              key={pkg.id} 
              package={pkg} 
              onActivate={handleActivate}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}