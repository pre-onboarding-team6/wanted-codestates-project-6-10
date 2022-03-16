import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL =
  'https://api.clinicaltrialskorea.com/api/v1/search-conditions/';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const saveCache = (word, data) => {
  let cache = JSON.parse(localStorage.getItem('searchResult'));
  const newData = {
    result: data,
    expireTime: Date.now() + 300000,
  };
  if (cache === null) {
    cache = {};
  }
  cache[word] = newData;
  localStorage.setItem(
    'searchResult',
    JSON.stringify({
      ...cache,
    }),
  );
};

export const searchDisease = createAsyncThunk(
  'data/searchData',
  async (word) => {
    const res = await fetch(`${BASE_URL}?name=${word}`);
    const data = await res.json();
    saveCache(word, data);
    return data;
  },
);

export const diseaseReducer = createSlice({
  name: 'disease',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
    },
    getLocalData: (state, action) => {
      const { keyword } = action.payload;
      const cache = JSON.parse(localStorage.getItem('searchResult'));
      state.data = cache[keyword].result;
    },
  },
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

export const { clearData, getLocalData } = diseaseReducer.actions;

export default diseaseReducer.reducer;
