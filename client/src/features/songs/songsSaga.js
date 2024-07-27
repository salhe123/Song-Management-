// src/features/songs/songsSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchGraphQL, CREATE_SONG, UPDATE_SONG, DELETE_SONG } from '../../graphql/Operation';
import client from '../../graphql/client';
import {deleteSongSuccess,deleteSongFailure} from "./songsSlice"

// Saga function for fetching songs
function* fetchSongsSaga() {
  try {
    const response = yield call(client.query, { query: fetchGraphQL });
    yield put({ type: 'songs/fetchSongsSuccess', payload: response.data.musics });
  } catch (e) {
    yield put({ type: 'songs/fetchSongsFailure', message: e.message });
  }
}

// Saga function for creating a song
function* createSongSaga(action) {
  try {
    console.log(action.payload)
    const response = yield call(client.mutate, { 
      mutation: CREATE_SONG, 
      variables: { 
        year: action.payload.year, 
        album: action.payload.album, 
        artist: action.payload.artist, 
        title: action.payload.title ,
        image_file:action.payload.imageFile,
      } 
    });

    // Dispatch success action with the newly created song
    yield put({ type: 'songs/createSongSuccess', payload: response.data.insert_musics.returning[0] });
    console.log("Successfully added song:", response.data.insert_musics.returning[0]);

    // Optionally, dispatch an action to fetch songs again if needed
    // yield put({ type: 'songs/fetchSongs' });

  } catch (e) {
    console.error("Failed to add song:", e);
    yield put({ type: 'songs/createSongFailure', message: e.message });
  }
}

function* updateSongSaga(action) {
  try {
    const { id, title, artist, album, year, audioFile, imageFile } = action.payload;

    // Perform the update using Apollo Client
    yield client.mutate({
      mutation: UPDATE_SONG,
      variables: { id, title, artist, album, year, audioFile, imageFile },
    });

    // Optionally refetch or update state
    yield put({ type: 'songs/fetchSongs' }); // Example action to refetch
  } catch (error) {
    console.error("Error updating song:", error);
  }
}
// Saga function for deleting a song
function* deleteSongSaga(action) {
  try {
    // Call the API to delete the song
    yield call(client.mutate, {
      mutation: DELETE_SONG,
      variables: { id: action.payload },
    });
    // Dispatch success action if API call is successful
    yield put(deleteSongSuccess(action.payload));
  } catch (e) {
    // Dispatch failure action if API call fails
    yield put(deleteSongFailure(e.message));
  }
}

// Root saga function that combines all the sagas
export default function* songsSaga() {
  yield takeLatest('songs/fetchSongs', fetchSongsSaga);
  yield takeLatest('songs/createSong', createSongSaga);
  yield takeLatest('songs/updateSong', updateSongSaga);
  yield takeLatest('songs/deleteSong', deleteSongSaga);
}
