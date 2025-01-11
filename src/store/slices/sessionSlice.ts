import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Session } from '@/types';

interface SessionState {
  sessions: Session[];
  upcomingSessions: Session[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  sessions: [],
  upcomingSessions: [],
  isLoading: false,
  error: null,
};

const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setSessions: (state, action: PayloadAction<Session[]>) => {
      state.sessions = action.payload;
    },
    setUpcomingSessions: (state, action: PayloadAction<Session[]>) => {
      state.upcomingSessions = action.payload;
    },
    addSession: (state, action: PayloadAction<Session>) => {
      state.sessions.push(action.payload);
    },
    updateSession: (state, action: PayloadAction<Session>) => {
      const index = state.sessions.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.sessions[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSessions,
  setUpcomingSessions,
  addSession,
  updateSession,
  setLoading,
  setError,
} = sessionSlice.actions;
export default sessionSlice.reducer;