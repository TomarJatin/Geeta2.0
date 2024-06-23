import { configureStore } from "@reduxjs/toolkit";
import chapterReducer from "./slices/ChapterSlice";
import saveForLaterReducer from "./slices/SaveForLaterSlice";
import settingsReducer from "./slices/SettingsSlice";
import themeReducer from "./slices/ThemeSlice";
import verseReducer from "./slices/VerseSlice";

const store = configureStore({
  reducer: {
    chapter: chapterReducer,
    saveForLater: saveForLaterReducer,
    settings: settingsReducer,
    theme: themeReducer,
    verse: verseReducer,
  },
});

export default store;
