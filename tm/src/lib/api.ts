// Simulated API calls with proper typing
import type { User, Package, Session, Availability } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
      await delay(1000);
      return {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          role: 'student',
        },
        token: 'mock-token',
      };
    },
  },
  packages: {
    getAll: async (): Promise<Package[]> => {
      await delay(1000);
      return [
        {
          id: '1',
          name: 'Starter Package',
          description: '10 hours of English sessions',
          hours: 10,
          price: 99,
          isActive: true,
        },
        // Add more mock packages
      ];
    },
    getUserPackages: async (userId: string): Promise<Package[]> => {
      await delay(1000);
      return [
        {
          id: '1',
          name: 'Starter Package',
          description: '10 hours of English sessions',
          hours: 10,
          price: 99,
          isActive: true,
        },
      ];
    },
  },
  sessions: {
    getAll: async (): Promise<Session[]> => {
      await delay(1000);
      return [
        {
          id: '1',
          studentId: '1',
          instructorId: '2',
          date: '2024-03-20',
          startTime: '10:00',
          endTime: '11:00',
          status: 'scheduled',
        },
        // Add more mock sessions
      ];
    },
    schedule: async (sessionData: Omit<Session, 'id'>): Promise<Session> => {
      await delay(1000);
      return {
        id: Math.random().toString(),
        ...sessionData,
      };
    },
  },
  availability: {
    getSlots: async (date: string): Promise<Availability[]> => {
      await delay(1000);
      return [
        {
          id: '1',
          instructorId: '2',
          date,
          startTime: '10:00',
          endTime: '11:00',
          isBooked: false,
        },
        // Add more mock slots
      ];
    },
  },
};