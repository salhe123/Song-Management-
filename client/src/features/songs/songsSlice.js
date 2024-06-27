import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchSongs(state) {
      state.status = 'loading';
    },
    fetchSongsSuccess(state, action) {
      state.status = 'succeeded';
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    addSong: (state, action) => {
      // Logic to add a new song to the state
      state.songs.push(action.payload);
    },
    updateSong: (state, action) => {
      // Logic to update an existing song in the state
      const { id, title } = action.payload;
      const existingSong = state.songs.find(song => song.id === id);
      if (existingSong) {
        existingSong.title = title;
      }
    },
    deleteSong: (state, action) => {
      const { id } = action.payload;
      state.songs = state.songs.filter(song => song.id !== id);
    },
  },
});

export const { fetchSongs, fetchSongsSuccess, fetchSongsFailure,addSong,updateSong,deleteSong } = songsSlice.actions;

export default songsSlice.reducer;
