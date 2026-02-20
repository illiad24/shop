import { createSlice } from "@reduxjs/toolkit";

interface BagState {
  isOpen: boolean;
}

const initialState: BagState = {
  isOpen: false,
};

const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    openBag: (state) => {
      state.isOpen = true;
    },
    closeBag: (state) => {
      state.isOpen = false;
    },
    toggleBag: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openBag, closeBag, toggleBag } = bagSlice.actions;
export default bagSlice.reducer;
