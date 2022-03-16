import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL =
  'https://api.clinicaltrialskorea.com/api/v1/search-conditions/';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const searchDisease = createAsyncThunk(
  'data/searchData',
  async (word) => {
    const res = await fetch(`${BASE_URL}?name=${word}`);
    const data = await res.json();
    return data;
  },
);

export const diseaseReducer = createSlice({
  name: 'disease',
  initialState,
  reducers: {},
  extraReducers: {
    [searchDisease.pending]: (state) => {
      state.loading = true;
    },
    [searchDisease.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    [searchDisease.rejected]: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export default diseaseReducer.reducer;
