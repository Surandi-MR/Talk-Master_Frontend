import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { DashboardStats } from './components/DashboardStats';
import { AdminStats } from './components/AdminStats';
import { InstructorStats } from './components/InstructorStats';
import { WelcomeCard } from './components/WelcomeCard';
import { QuickActions } from './components/QuickActions';
import { UpcomingSessions } from './components/UpcomingSessions';

export function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  const renderDashboardContent = () => {
    switch (user?.role) {
      case 'ADMIN':
        return <AdminStats />;
      case 'INSTRUCTOR':
        return (
          <>
            <InstructorStats />
            <UpcomingSessions />
          </>
        );
      default: // STUDENT
        return (
          <>
            <DashboardStats />
            <div className="grid md:grid-cols-2 gap-6">
              <WelcomeCard />
              <QuickActions />
            </div>
            <UpcomingSessions />
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      {renderDashboardContent()}
    </div>
  );
}