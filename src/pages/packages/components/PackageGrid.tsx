import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PackageCard } from './PackageCard';
import { PackageForm } from './PackageForm';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { mockPackages } from '@/data/mockPackages';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import type { Package } from '@/types';

export function PackageGrid() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'ADMIN';
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleActivate = (packageId: string) => {
    // Handle package activation
    console.log('Activating package:', packageId);
  };

  const handleCreate = (data: Omit<Package, 'id' | 'isActive'>) => {
    // Here you would typically make an API call to create the package
    console.log('Creating package:', data);
  };

  const handleEdit = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsEditOpen(true);
  };

  const handleUpdate = (data: Omit<Package, 'id' | 'isActive'>) => {
    // Here you would typically make an API call to update the package
    console.log('Updating package:', { ...data, id: selectedPackage?.id });
  };

  const handleDeleteClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedPackage) {
      // Here you would typically make an API call to delete the package
      console.log('Deleting package:', selectedPackage.id);
      setIsDeleteOpen(false);
      setSelectedPackage(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {isAdmin ? 'Manage Packages' : 'Activate a Package'}
        </CardTitle>
        {isAdmin && (
          <Button 
            className="bg-[#DC2626] hover:bg-[#B91C1C]"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Package
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {mockPackages.map((pkg) => (
            <PackageCard 
              key={pkg.id} 
              package={pkg} 
              onActivate={handleActivate}
              onEdit={handleEdit}
              onDelete={() => handleDeleteClick(pkg)}
            />
          ))}
        </div>
      </CardContent>

      <PackageForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
        title="Create New Package"
      />

      <PackageForm
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSubmit={handleUpdate}
        initialData={selectedPackage || undefined}
        title="Edit Package"
      />

      {selectedPackage && (
        <DeleteConfirmDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={handleDeleteConfirm}
          packageName={selectedPackage.name}
        />
      )}
    </Card>
  );
}