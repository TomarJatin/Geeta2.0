import { createSlice } from "@reduxjs/toolkit";

const saveForLaterSlice = createSlice({
  name: "saveForLater",
  initialState: { saveForLater: [] },
  reducers: {
    setSaveForLater(state, action) {
      state.saveForLater = action.payload;
    },
  },
});

export const { setSaveForLater } = saveForLaterSlice.actions;
export default saveForLaterSlice.reducer;
