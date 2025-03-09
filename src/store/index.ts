import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import packageReducer from './slices/packageSlice';
import sessionReducer from './slices/sessionSlice';
import availabilityReducer from './slices/availabilitySlice';
import studentsReducer from './slices/studentsSlice';
import instructorsSlice from './slices/instructorsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    packages: packageReducer,
    sessions: sessionReducer,
    availability: availabilityReducer,
    students: studentsReducer,
    instructors: instructorsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;