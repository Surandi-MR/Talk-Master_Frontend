import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PackageModel {
    id: string;
    name: string;
    price: number;
    sessions: number;
    description: string;
}

interface PackageHistory {
    id: string;
    userId: string;
    packageId: string;
    purchaseDate: string;
    remainingSessions: number;
    packageModel: PackageModel;
}

interface PackageHistoryState {
    packageHistories: PackageHistory[];
}

const initialState: PackageHistoryState = {
    packageHistories: []
};

const packageHistorySlice = createSlice({
    name: 'packageHistory',
    initialState,
    reducers: {
        setPackageHistories(state, action: PayloadAction<PackageHistory[]>) {
            state.packageHistories = action.payload;
        },
        addPackageHistory(state, action: PayloadAction<PackageHistory>) {
            state.packageHistories.push(action.payload);
        },
        updatePackageHistory(state, action: PayloadAction<PackageHistory>) {
            const index = state.packageHistories.findIndex(ph => ph.id === action.payload.id);
            if (index !== -1) {
                state.packageHistories[index] = action.payload;
            }
        },
        removePackageHistory(state, action: PayloadAction<string>) {
            state.packageHistories = state.packageHistories.filter(ph => ph.id !== action.payload);
        }
    }
});

export const { setPackageHistories, addPackageHistory, updatePackageHistory, removePackageHistory } = packageHistorySlice.actions;

export default packageHistorySlice.reducer;