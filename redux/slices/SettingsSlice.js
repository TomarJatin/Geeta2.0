import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    language: "english",
    commentryOn: true,
    wordMeaningOn: true,
    translationOn: true,
    transliteration: true,
    authorsList: [
      {
        author_name: "Swami Adidevananda",
        language: "english",
      },
      {
        author_name: "Swami Gambirananda",
        language: "english",
      },
      {
        author_name: "Swami Sivananda",
        language: "english",
      },
      {
        author_name: "Dr. S. Sankaranarayan",
        language: "english",
      },
      {
        author_name: "Shri Purohit Swami",
        language: "english",
      },
    ],
    allTranslationsAuthors: [
      {
        author_name: "Swami Adidevananda",
        language: "english",
      },
      {
        author_name: "Swami Gambirananda",
        language: "english",
      },
      {
        author_name: "Swami Ramsukhdas",
        language: "hindi",
      },
      {
        author_name: "Swami Tejomayananda",
        language: "hindi",
      },
      {
        author_name: "Swami Sivananda",
        language: "english",
      },
      {
        author_name: "Dr. S. Sankaranarayan",
        language: "english",
      },
      {
        author_name: "Shri Purohit Swami",
        language: "english",
      },
    ],
  },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setCommentryOn(state, action) {
      state.commentryOn = action.payload;
    },
    setWordMeaningOn(state, action) {
      state.wordMeaningOn = action.payload;
    },
    setTranslationOn(state, action) {
      state.translationOn = action.payload;
    },
    setTransliterationOn(state, action) {
      state.transliteration = action.payload;
    },
    setAuthorsList(state, action) {
      state.authorsList = action.payload;
    },
  },
});

export const {
  setLanguage,
  setCommentryOn,
  setWordMeaningOn,
  setTranslationOn,
  setTransliterationOn,
  setAuthorsList,
} = settingsSlice.actions;
export default settingsSlice.reducer;
