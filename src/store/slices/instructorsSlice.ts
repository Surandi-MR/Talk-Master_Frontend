import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface instructors {
    instructors: User[];
    isLoading: boolean;
    error: string | null;
}

const initialState: instructors = {
  instructors: [],
  isLoading: false,
  error: null,
};

const instructorsSlice = createSlice({
    name: 'instructors',
    initialState,
    reducers: {
        setInstructors: (state, action: PayloadAction<User[]>) => {
            state.instructors = action.payload;
        },
        addInstructor: (state, action: PayloadAction<User>) => {
            state.instructors.push(action.payload);
        },
        updateInstructor: (state, action: PayloadAction<User>) => {
            const index = state.instructors.findIndex(
              (s) => s.id === action.payload.id
            );
            if (index !== -1) {
                state.instructors[index] = action.payload;
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
  setInstructors,
  addInstructor,
  updateInstructor,
  setLoading,
  setError,
} = instructorsSlice.actions;
export default instructorsSlice.reducer;