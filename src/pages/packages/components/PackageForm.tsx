import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import type { Package } from "@/types";

interface PackageFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Package, "id" | "isActive">) => Promise<void>;
  initialData?: Package;
  title: string;
}

export function PackageForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
}: PackageFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    sessions: initialData?.sessions || 0,
    price: initialData?.price || 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    sessions: "",
    price: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        sessions: initialData.sessions,
        price: initialData.price,
      });
      // Clear errors when initialData changes
      setErrors({
        name: "",
        description: "",
        sessions: "",
        price: "",
      });
    }
  }, [initialData]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      description: "",
      sessions: "",
      price: "",
    };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Package name is required";
      valid = false;
    }

    // Validate sessions (must be positive)
    if (formData.sessions <= 0) {
      newErrors.sessions = "Sessions must be a positive number";
      valid = false;
    }

    // Validate price (must be positive)
    if (formData.price <= 0) {
      newErrors.price = "Price must be a positive number";
      valid = false;
    }

    // Optional: Validate description if needed
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await onSubmit(formData);
      onOpenChange(false);
      setFormData({ name: "", description: "", sessions: 0, price: 0 });
      setErrors({ name: "", description: "", sessions: "", price: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Package Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              min="1"
              // step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sessions">Sessions</Label>
            <Input
              id="sessions"
              type="number"
              min="1"
              step="1"
              value={formData.sessions}
              onChange={(e) =>
                setFormData({ ...formData, sessions: Number(e.target.value) })
              }
              className={errors.sessions ? "border-red-500" : ""}
            />
            {errors.sessions && (
              <p className="text-red-500 text-sm mt-1">{errors.sessions}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
