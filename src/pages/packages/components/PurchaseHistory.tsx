import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

export function PurchaseHistory() {
  const history = [
    {
      id: 1,
      packageName: 'Premium Package',
      purchaseDate: 'March 15, 2024',
      hours: 20,
      price: 199,
    },
    {
      id: 2,
      packageName: 'Basic Package',
      purchaseDate: 'February 1, 2024',
      hours: 10,
      price: 99,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{item.packageName}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {item.purchaseDate}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {item.hours} hours
                </div>
              </div>
              <p className="text-lg font-bold">${item.price}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}