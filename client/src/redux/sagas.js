import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchSongs as fetchSongsApi, createSong as createSongApi } from '../api/api';
import { fetchSongs, createSong } from '../features/songSlice';

function* fetchSongsSaga() {
  try {
    const songs = yield call(fetchSongsApi);
    yield put(fetchSongs(songs));
  } catch (error) {
    // Handle error
  }
}

function* createSongSaga(action) {
  try {
    const song = yield call(createSongApi, action.payload);
    yield put(createSong(song));
  } catch (error) {
    // Handle error
  }
}

export function* watchFetchSongs() {
  yield takeLatest('songs/fetchSongs', fetchSongsSaga);
}

export function* watchCreateSong() {
  yield takeLatest('songs/createSong', createSongSaga);
}
