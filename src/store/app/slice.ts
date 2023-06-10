import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  isInitialized: boolean;
}

const initialState: AppState = {
  isInitialized: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized: state => {
      state.isInitialized = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInitialized } = appSlice.actions;

export default appSlice.reducer;
