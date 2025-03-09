import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface students {
    students: User[];
    isLoading: boolean;
    error: string | null;
}

const initialState: students = {
    students: [],
    isLoading: false,
    error: null,
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudents: (state, action: PayloadAction<User[]>) => {
            state.students = action.payload;
        },
        addStudent: (state, action: PayloadAction<User>) => {
            state.students.push(action.payload);
        },
        updateStudent: (state, action: PayloadAction<User>) => {
            const index = state.students.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                state.students[index] = action.payload;
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

export const { setStudents, addStudent, updateStudent, setLoading, setError } = studentsSlice.actions;
export default studentsSlice.reducer;