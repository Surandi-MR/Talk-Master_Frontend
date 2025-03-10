import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RootState } from '@/store';
import { SessionCard } from './SessionCard';
import { setError, setSessions } from '@/store/slices/sessionSlice';
import { useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';

export function SessionList() {
  const dispatch = useDispatch();
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Fetch upcomming sessions
    if (user) {
      axiosInstance.get(`/api/sessions?status=SCHEDULED&studentId=${user.id}`)
        .then((response) => {
          dispatch(setSessions(response.data));
        })
        .catch((error) => {
          console.error('Error fetching sessions:', error);
          dispatch(setError('Error fetching sessions'));
        });
    } else {
      console.error('User is null');
      dispatch(setError('User is not logged in'));
    }
  }, [dispatch, user]
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </CardContent>
    </Card>
  );
}