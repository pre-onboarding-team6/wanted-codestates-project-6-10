import { configureStore } from '@reduxjs/toolkit';
import diseaseReducer from './diseaseReducer';

export const store = configureStore({
  reducer: {
    data: diseaseReducer,
  },
});
