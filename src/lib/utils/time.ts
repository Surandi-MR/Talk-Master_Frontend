// Generate time slots from 6 AM to midnight in 30-minute intervals
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 6; hour < 24; hour++) {
    const hourStr = hour.toString().padStart(2, '0');
    slots.push(`${hourStr}:00`);
    slots.push(`${hourStr}:30`);
  }
  return slots;
}