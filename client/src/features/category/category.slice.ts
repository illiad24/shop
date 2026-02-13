import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../../app/store/store";

const categorySlice = createSlice({
  name: "categoryType",
  initialState: {
    selectedCategory: null,
  },
  reducers: {
    selectCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});
export const { selectCategory } = categorySlice.actions;
export const selectCategoryType = (state: RootState) =>
  state.categoryType.selectedCategory;
export default categorySlice.reducer;
