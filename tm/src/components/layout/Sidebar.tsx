import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { RootState } from '@/store';
import {
  LayoutDashboard,
  Package,
  Calendar,
  History,
  Users,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';

interface SidebarProps {
  onNavigate?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ onNavigate , isMobile}: SidebarProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const navigation = {
    student: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Packages', href: '/packages', icon: Package },
      { name: 'My Sessions', href: '/sessions', icon: Calendar },
      { name: 'History', href: '/history', icon: History },
    ],
    instructor: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Schedule', href: '/schedule', icon: Calendar },
      { name: 'History', href: '/history', icon: History },
    ],
    admin: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Users', href: '/users', icon: Users },
      { name: 'Packages', href: '/packages', icon: Package },
    ],
  };

  const links = navigation[user?.role as keyof typeof navigation] || [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Packages", href: "/packages", icon: Package },
    { name: "My Sessions", href: "/sessions", icon: Calendar },
    { name: "History", href: "/history", icon: History },
  ];

  return (
    <div className="flex h-full flex-col bg-[#0A192F] text-white">
      {isMobile && (
        <div className="p-6">
          <Logo size="fit" />
        </div>
      )}
      <nav className="flex-1 space-y-1 px-2 mt-0 md:mt-10">
        {links.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-[#DC2626] text-white'
                  : 'text-gray-300 hover:bg-white/10'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}