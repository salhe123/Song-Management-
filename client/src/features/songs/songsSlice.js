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
      const newSong = {
        id: action.payload.id, // Ensure the payload contains a unique ID
        title: action.payload.title,
        artist: action.payload.artist,
        album: action.payload.album,
        year: action.payload.year,
        audioFile: action.payload.audioFile,
      };
      state.songs.push(newSong);
    },
    updateSong: (state, action) => {
      const { id, title, artist, album, year, audioFile } = action.payload;
      const existingSong = state.songs.find(song => song.id === id);
      if (existingSong) {
        existingSong.title = title;
        existingSong.artist = artist;
        existingSong.album = album;
        existingSong.year = year;
        if (audioFile) {
          existingSong.audioFile = audioFile; // Only update if a new file is provided
        }
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
