// User Roles
export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

// User Interface
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_no: string;
  role: UserRole;
  avatar?: string;
  birthday?: string;
}

// Package Interface
export interface Package {
  id: string;
  name: string;
  description: string;
  sessions: number;
  price: number;
  isActive: boolean;
}

// Session Interface
export interface Session {
  id: string;
  studentId: string;
  instructorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: string;
}

// Instructor Availability
export interface Availability {
  id: string;
  instructorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Link {
    name: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }