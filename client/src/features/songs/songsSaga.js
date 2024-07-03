// src/features/songs/songsSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchGraphQL, CREATE_SONG, UPDATE_SONG, DELETE_SONG } from '../../graphql/Operation';
import client from '../../graphql/client';
import {updateSongFailure,updateSongSuccess} from "./songsSlice"

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
        title: action.payload.title 
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

// Saga function for updating a song
function* updateSongSaga(action) {
  try {
    const { id, title, artist, album, year, audioFile, imageFile } = action.payload;

    // Log variables to verify their values
    console.log("Variables being passed to the mutation:", {
      id,
      title,
      artist,
      album,
      year,
      audio_file: audioFile ? audioFile.name : null,
      image_file: imageFile ? imageFile.name : null,
    });
    // Handle file uploads if necessary
    let uploadedAudioFile = audioFile;
    let uploadedImageFile = imageFile;

    // Example for handling file uploads, if needed
    if (audioFile) {
      // Replace with your actual file upload logic
      const audioResponse = yield call(uploadFile, audioFile);
      uploadedAudioFile = audioResponse.fileName;
    }

    if (imageFile) {
      // Replace with your actual file upload logic
      const imageResponse = yield call(uploadFile, imageFile);
      uploadedImageFile = imageResponse.fileName;
    }

    // Constructing variables for the GraphQL mutation
    const variables = {
      input: {
        id,
        title,
        artist,
        album,
        year: parseInt(year),
        audio_file: uploadedAudioFile,
        image_file: uploadedImageFile,
      },
    };

    // Making the API call using your GraphQL client
    const response = yield call(client.mutate, {
      mutation: UPDATE_SONG,
      variables,
    });

    // Dispatching success action with updated song data
    yield put(updateSongSuccess(response.data.update_musics.returning[0]));
  } catch (e) {
    // Dispatching failure action with error message
    yield put(updateSongFailure(e.message));
  }
}

// Saga function for deleting a song
function* deleteSongSaga(action) {
  try {
    const response = yield call(client.mutate, { mutation: DELETE_SONG, variables: { id: action.payload } });
    yield put({ type: 'songs/deleteSongSuccess', payload: action.payload });
  } catch (e) {
    yield put({ type: 'songs/deleteSongFailure', message: e.message });
  }
}

// Root saga function that combines all the sagas
export default function* songsSaga() {
  yield takeLatest('songs/fetchSongs', fetchSongsSaga);
  yield takeLatest('songs/createSong', createSongSaga);
  yield takeLatest('songs/updateSong', updateSongSaga);
  yield takeLatest('songs/deleteSong', deleteSongSaga);
}
