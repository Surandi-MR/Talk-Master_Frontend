import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PackageCard } from './PackageCard';
import { PackageForm } from './PackageForm';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import type { Package } from '@/types';
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { setPackageHistories } from '@/store/slices/packageHistorySlice';

export function PackageGrid() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'ADMIN';
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get("/api/package/all")
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch packages", error);
      });
  }, []);

  const handleActivate = async (packageId: string) => {
    axiosInstance.post(`/api/user-packages?userId=${user?.id}&packageId=${packageId}`)
      .then(() => {
        toast.success("Package activated successfully");
        axiosInstance
          .get(`/api/user-packages/user/${user?.id}`)
          .then((response) => {
            dispatch(setPackageHistories(response.data));
          });
      })
      .catch((error) => {
        toast.error("Failed to activate package" + error);
      });
  };

  const handleCreate = async (data: Omit<Package, 'id' | 'isActive'>) => {
    axiosInstance
      .post("/api/package", data)
      .then((response) => {
        toast.success("Package created successfully");
        setPackages([...packages, response.data]);
        setIsCreateOpen(false);
      })
      .catch((error) => {
        toast.error("Failed to create package" + error);
      });
  };

  const handleEdit = (pkg: Package) => {
    setSelectedPackage(pkg);
    console.log('Editing package:', pkg);
    setIsEditOpen(true);
  };

  const handleUpdate = async (data: Omit<Package, 'id' | 'isActive'>) => {
    axiosInstance.put(`/api/package/${selectedPackage?.id}`, data)
      .then((response) => {
        toast.success("Package updated successfully");
        setPackages(packages.map(pkg => pkg.id === selectedPackage?.id ? response.data : pkg));
        setIsEditOpen(false);
        setSelectedPackage(null);
      })
      .catch((error) => {
        toast.error("Failed to update package" + error);
      }
    );
    console.log('Updating package:', { ...data, id: selectedPackage?.id });
  };

  const handleDeleteClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPackage) {
      axiosInstance.delete(`/api/package/${selectedPackage.id}`)
        .then(() => {
          toast.success("Package deleted successfully");
          setPackages(packages.filter(pkg => pkg.id !== selectedPackage.id));
        })
        .catch((error) => {
          toast.error("Failed to delete package" + error);
        });
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
          {packages.map((pkg) => (
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