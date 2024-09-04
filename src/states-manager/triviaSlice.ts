// src/redux/triviaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answeredCount: 0,
  correctAnswers: 0,
};

const triviaSlice = createSlice({
  name: 'trivia',
  initialState,
  reducers: {
    incrementAnsweredCount: (state) => {
      state.answeredCount += 1;
    },
    incrementCorrectAnswers: (state) => {
      state.correctAnswers += 1;
    }
  },
});

export const { incrementAnsweredCount, incrementCorrectAnswers } = triviaSlice.actions;

export default triviaSlice.reducer;
