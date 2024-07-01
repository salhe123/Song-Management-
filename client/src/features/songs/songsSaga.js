// src/features/songs/songsSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchGraphQL, CREATE_SONG, UPDATE_SONG, DELETE_SONG } from '../../graphql/Operation';
import client from '../../graphql/client';

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
    const response = yield call(client.mutate, { mutation: CREATE_SONG, variables: action.payload });
    yield put({ type: 'songs/createSongSuccess', payload: response.data.insert_musics.returning[0] });
  } catch (e) {
    yield put({ type: 'songs/createSongFailure', message: e.message });
  }
}

// Saga function for updating a song
function* updateSongSaga(action) {
  try {
    const response = yield call(client.mutate, { mutation: UPDATE_SONG, variables: action.payload });
    yield put({ type: 'songs/updateSongSuccess', payload: response.data.update_musics.returning[0] });
  } catch (e) {
    yield put({ type: 'songs/updateSongFailure', message: e.message });
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
