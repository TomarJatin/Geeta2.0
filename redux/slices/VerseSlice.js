import { createSlice } from "@reduxjs/toolkit";

const verseSlice = createSlice({
  name: "verse",
  initialState: { selectedVerse: 0 },
  reducers: {
    setSelectedVerse(state, action) {
      state.selectedVerse = action.payload;
    },
  },
});

export const { setSelectedVerse } = verseSlice.actions;
export default verseSlice.reducer;
