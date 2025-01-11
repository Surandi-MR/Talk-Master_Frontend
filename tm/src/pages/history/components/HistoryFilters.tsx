import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function HistoryFilters() {
  return (
    <Card>
      <CardContent className="flex flex-wrap gap-4 p-4">
        {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select> */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Instructor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Instructors</SelectItem>
            <SelectItem value="active">Current Instructors</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Clear Filters</Button>
      </CardContent>
    </Card>
  );
}