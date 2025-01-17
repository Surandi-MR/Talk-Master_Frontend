import { PackageGrid } from './components/PackageGrid';
import { PurchaseHistory } from './components/PurchaseHistory';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function Packages() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isStudent = user?.role === 'STUDENT';

  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold">Packages</h1>
      <PackageGrid />
      {isStudent && <PurchaseHistory />}
    </div>
  );
}