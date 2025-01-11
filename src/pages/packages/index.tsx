import { PackageGrid } from './components/PackageGrid';
import { PurchaseHistory } from './components/PurchaseHistory';

export function Packages() {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold">Packages</h1>
      <PackageGrid />
      <PurchaseHistory />
    </div>
  );
}