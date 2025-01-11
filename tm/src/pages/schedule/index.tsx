import { AvailabilityCalendar } from './components/AvailabilityCalendar';

export function Schedule() {
  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Schedule Management</h1>
      <div className="flex-1 min-h-0">
        <AvailabilityCalendar />
      </div>
    </div>
  );
}