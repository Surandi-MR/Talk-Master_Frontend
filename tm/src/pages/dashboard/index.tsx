import { DashboardStats } from './components/DashboardStats';
import { WelcomeCard } from './components/WelcomeCard';
import { QuickActions } from './components/QuickActions';
import { UpcomingSessions } from './components/UpcomingSessions';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <DashboardStats />
      <div className="grid md:grid-cols-2 gap-6">
        <WelcomeCard />
        <QuickActions />
      </div>
      <UpcomingSessions />
    </div>
  );
}