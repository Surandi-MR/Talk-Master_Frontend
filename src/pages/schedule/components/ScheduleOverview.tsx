import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

export function ScheduleOverview() {
  const stats = [
    { label: 'Total Hours', value: '24', icon: Clock },
    { label: 'Available Slots', value: '12', icon: Calendar },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}