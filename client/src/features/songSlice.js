import { createSlice } from '@reduxjs/toolkit';
import { fetchSongsApi, createSongApi } from '../api/api';

const initialState = {
  songs: [],
  status: 'idle',
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Add reducer functions here
  },
  extraReducers: {
    [fetchSongsApi.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.songs = action.payload;
    },
    [fetchSongsApi.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSongsApi.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createSongApi.fulfilled]: (state, action) => {
      state.songs.push(action.payload);
    },
  },
});

export const songsActions = songsSlice.actions;
export default songsSlice.reducer;
