import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RootState } from '@/store';
import { PackageCard } from './PackageCard';

export function PackageList() {
  const packages = useSelector((state: RootState) => state.packages.packages);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Packages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}