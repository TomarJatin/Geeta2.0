import { createSlice } from "@reduxjs/toolkit";

const chapterSlice = createSlice({
  name: "chapter",
  initialState: { selectedChapter: 0 },
  reducers: {
    setSelectedChapter(state, action) {
      state.selectedChapter = action.payload;
    },
  },
});

export const { setSelectedChapter } = chapterSlice.actions;
export default chapterSlice.reducer;
