import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bell, User, Pencil, Camera, Lock, Calendar } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/store";
import { logout, setUser } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone_no: user?.phone_no || "",
    avatar: user?.avatar || "",
    birthday: user?.birthday || "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    birthday: "",
  });

  useEffect(() => {
    setProfileData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone_no: user?.phone_no || "",
      avatar: user?.avatar || "",
      birthday: user?.birthday || "",
    });
  }, [user]);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const validateProfileForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone_no: "",
      birthday: "",
    };
    let isValid = true;

    // First name validation
    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Last name validation
    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone number validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (profileData.phone_no && !phoneRegex.test(profileData.phone_no)) {
      newErrors.phone_no = "Please enter a valid phone number";
      isValid = false;
    }

    // Birthday validation
    if (profileData.birthday) {
      const birthdayDate = new Date(profileData.birthday);
      const today = new Date();
      if (isNaN(birthdayDate.getTime())) {
        newErrors.birthday = "Please enter a valid date";
        isValid = false;
      } else if (birthdayDate > today) {
        newErrors.birthday = "Birthday cannot be in the future";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const validatePasswordForm = () => {
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Old password validation
    if (!passwordData.oldPassword) {
      newErrors.oldPassword = "Current password is required";
      isValid = false;
    }

    // New password validation
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
      isValid = false;
    }

    // Confirm password validation
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setPasswordErrors(newErrors);
    return isValid;
  };

  const handleSaveProfile = () => {
    if (!user || !validateProfileForm()) return;

    axiosInstance
      .put(`/api/user/${user.id}`, profileData)
      .then((response) => {
        dispatch(setUser(response.data));
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData({ ...profileData, avatar: imageUrl });
    }
  };

  const handlePasswordChange = () => {
    if (!validatePasswordForm()) return;

    axiosInstance
      .put(`/api/user/update-password/${user?.id}`, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      })
      .then(() => {
        toast.success("Password changed successfully");
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsPasswordDialogOpen(false);
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
  };

  const formatBirthdayForDisplay = (dateString: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return date.toISOString().split("T")[0]; 
    } catch (e) {
      return dateString;
      console.error(e);
    }
  };

  return (
    <header className="bg-[#0A192F] text-white border-b border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          {children}
          <Logo className="hidden md:flex" size="lg" />
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white/80"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={profileData.avatar}
                    alt={profileData.firstName}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback>
                    {profileData.firstName[0]}
                    {profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                disabled={!isEditing}
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                disabled={!isEditing}
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                disabled={!isEditing}
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                disabled={!isEditing}
                value={profileData.phone_no}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone_no: e.target.value })
                }
              />
              {errors.phone_no && (
                <p className="text-sm text-red-500">{errors.phone_no}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="birthday">Birthday</Label>
              <div className="relative">
                <Input
                  id="birthday"
                  type={isEditing ? "date" : "text"}
                  disabled={!isEditing}
                  value={
                    isEditing
                      ? profileData.birthday
                      : formatBirthdayForDisplay(profileData.birthday)
                  }
                  onChange={(e) =>
                    setProfileData({ ...profileData, birthday: e.target.value })
                  }
                />
                {!isEditing && profileData.birthday && (
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                )}
              </div>
              {errors.birthday && (
                <p className="text-sm text-red-500">{errors.birthday}</p>
              )}
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsPasswordDialogOpen(true)}
              >
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            )}
          </div>
          <DialogFooter>
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
              />
              {passwordErrors.oldPassword && (
                <p className="text-sm text-red-500">
                  {passwordErrors.oldPassword}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
              {passwordErrors.newPassword && (
                <p className="text-sm text-red-500">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {passwordErrors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPasswordDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePasswordChange}>Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
