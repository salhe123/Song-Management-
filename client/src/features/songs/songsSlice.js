import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    status: 'idle', // Initial status is 'idle'
    error: null,    // Initial error state is null
  },
  reducers: {
    // Reducer for fetching songs, setting status to 'loading'
    fetchSongs(state) {
      state.status = 'loading';
    },
    // Reducer for successful fetch, setting status to 'succeeded' and updating songs array
    fetchSongsSuccess(state, action) {
      state.status = 'succeeded';
      state.songs = action.payload;
    },
    // Reducer for fetch failure, setting status to 'failed' and updating error state
    fetchSongsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    // Reducer for adding a new song to the state
    addSong(state, action) {
      const newSong = {
        id: action.payload.id,
        title: action.payload.title,
        artist: action.payload.artist,
        album: action.payload.album,
        year: action.payload.year,
        audioFile: action.payload.audioFile,
      };
      state.songs.push(newSong);
    },
    // Reducer for updating an existing song in the state
    updateSong(state, action) {
      const { id, title, artist, album, year, audioFile } = action.payload;
      const existingSong = state.songs.find(song => song.id === id);
      if (existingSong) {
        existingSong.title = title;
        existingSong.artist = artist;
        existingSong.album = album;
        existingSong.year = year;
        if (audioFile) {
          existingSong.audioFile = audioFile; // Update audio file if provided
        }
      }
    },
    // Reducer for deleting a song from the state
    deleteSong(state, action) {
      const { id } = action.payload;
      state.songs = state.songs.filter(song => song.id !== id);
    },
  },
});

// Destructure and export actions from the slice
export const { fetchSongs, fetchSongsSuccess, fetchSongsFailure, addSong, updateSong, deleteSong } = songsSlice.actions;

// Export the reducer function
export default songsSlice.reducer;
