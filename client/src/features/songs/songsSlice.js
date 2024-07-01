import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  status: "idle",
  error: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs(state) {
      state.status = "loading";
    },
    fetchSongsSuccess(state, action) {
      state.status = "succeeded";
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    createSong(state) {
      state.status = "loading";
    },
    createSongSuccess(state, action) {
      state.status = "succeeded";
      state.songs.push(action.payload);
    },
    createSongFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    updateSong(state) {
      state.status = "loading";
    },
    updateSongSuccess(state, action) {
      state.status = "succeeded";
      const updatedSong = action.payload;
      state.songs = state.songs.map((song) =>
        song.id === updatedSong.id ? updatedSong : song
      );
    },
    updateSongFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteSong(state) {
      state.status = "loading";
    },
    deleteSongSuccess(state, action) {
      state.status = "succeeded";
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    deleteSongFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSong,
  createSongSuccess,
  createSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
