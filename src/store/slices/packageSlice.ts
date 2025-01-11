import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Package } from '@/types';

interface PackageState {
  packages: Package[];
  userPackages: Package[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PackageState = {
  packages: [],
  userPackages: [],
  isLoading: false,
  error: null,
};

const packageSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setPackages: (state, action: PayloadAction<Package[]>) => {
      state.packages = action.payload;
    },
    setUserPackages: (state, action: PayloadAction<Package[]>) => {
      state.userPackages = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPackages, setUserPackages, setLoading, setError } = packageSlice.actions;
export default packageSlice.reducer;