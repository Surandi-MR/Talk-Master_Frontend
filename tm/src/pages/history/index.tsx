import { HistoryList } from './components/HistoryList';
import { HistoryStats } from './components/HistoryStats';
import { HistoryFilters } from './components/HistoryFilters';

export function History() {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold">Session History</h1>
      <HistoryStats />
      <HistoryFilters />
      <HistoryList />
    </div>
  );
}