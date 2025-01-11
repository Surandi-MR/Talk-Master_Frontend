import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RootState } from '@/store';
import { HistoryCard } from './HistoryCard';

export function HistoryList() {
  const sessions = useSelector((state: RootState) => 
    state.sessions.sessions.filter(session => session.status === 'completed')
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => (
          <HistoryCard key={session.id} session={session} />
        ))}
      </CardContent>
    </Card>
  );
}