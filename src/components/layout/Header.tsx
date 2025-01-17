import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, User, Pencil, Camera, Lock } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

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
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone_no: user?.phone_no || '',
    avatar: user?.avatar || '',
  });

  useEffect(() => {
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone_no: user?.phone_no || '',
      avatar: user?.avatar || '',
    });
  }, [user]);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

 const handleLogout = () => {
   dispatch(logout());
   localStorage.removeItem("authToken");
   localStorage.removeItem("user");
   navigate("/login");
 };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to update the user profile
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your server
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      setProfileData({ ...profileData, avatar: imageUrl });
    }
  };

  const handlePasswordChange = () => {
    // Here you would typically make an API call to change the password
    console.log('Changing password:', passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsPasswordDialogOpen(false);
  };

  return (
    <header className="bg-[#0A192F] text-white border-b border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          {children}
          <Logo className="hidden md:flex" size='lg' />
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profileData.avatar} alt={profileData.firstName} />
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
                    {profileData.firstName[0]}{profileData.lastName[0]}
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
              <Label>First Name</Label>
              <Input
                disabled={!isEditing}
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Last Name</Label>
              <Input
                disabled={!isEditing}
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                disabled={!isEditing}
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone Number</Label>
              <Input
                disabled={!isEditing}
                value={profileData.phone_no}
                onChange={(e) => setProfileData({ ...profileData, phone_no: e.target.value })}
              />
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
                <Button onClick={handleSaveProfile}>
                  Save Changes
                </Button>
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

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Current Password</Label>
              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>New Password</Label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordChange}>
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}