import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Availability } from '@/types';

interface AvailabilityState {
  slots: Availability[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AvailabilityState = {
  slots: [],
  isLoading: false,
  error: null,
};

const availabilitySlice = createSlice({
  name: 'availability',
  initialState,
  reducers: {
    setSlots: (state, action: PayloadAction<Availability[]>) => {
      state.slots = action.payload;
    },
    addSlot: (state, action: PayloadAction<Availability>) => {
      state.slots.push(action.payload);
    },
    updateSlot: (state, action: PayloadAction<Availability>) => {
      const index = state.slots.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.slots[index] = action.payload;
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

export const { setSlots, addSlot, updateSlot, setLoading, setError } = availabilitySlice.actions;
export default availabilitySlice.reducer;