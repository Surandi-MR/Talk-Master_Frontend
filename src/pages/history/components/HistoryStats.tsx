import { Card, CardContent } from '@/components/ui/card';
import { Clock, CalendarCheck, Star } from 'lucide-react';

export function HistoryStats() {
  const stats = [
    {
      label: 'Total Hours',
      value: '45',
      icon: Clock,
    },
    {
      label: 'Sessions Completed',
      value: '24',
      icon: CalendarCheck,
    },
    {
      label: 'Average Rating',
      value: '4.8',
      icon: Star,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}