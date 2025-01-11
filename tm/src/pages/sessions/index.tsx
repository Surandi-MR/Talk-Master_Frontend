import { SessionList } from './components/SessionList';
import { ScheduleSession } from './components/ScheduleSession';

export function Sessions() {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold">My Sessions</h1>
      <div className="grid gap-6">
        <ScheduleSession />
        <SessionList />
      </div>
    </div>
  );
}