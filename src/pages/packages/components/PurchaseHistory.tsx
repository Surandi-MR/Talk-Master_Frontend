import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axiosInstance from '@/lib/axiosInstance';
import { RootState } from '@/store';
import { Calendar, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPackageHistories } from '@/store/slices/packageHistorySlice';

export function PurchaseHistory() {
  const dispatch = useDispatch();
  const packageHistory = useSelector((state: RootState) => state.packageHistory.packageHistories);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Fetch purchase history
    axiosInstance.get(`/api/user-packages/user/${user?.id}`)
      .then((response) => {
        dispatch(setPackageHistories(response.data));
      }
      )
  }, [dispatch, user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {packageHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{item.packageModel.name}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {item.purchaseDate && new Date(item.purchaseDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {item.remainingSessions} sessions available out of {item.packageModel.sessions} sessions.
                </div>
              </div>
              <p className="text-lg font-bold">${item.packageModel.price}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}