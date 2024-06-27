import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchSongsApi } from '../../api/songsApi';
import { fetchSongsSuccess, fetchSongsFailure } from './songsSlice';

function* fetchSongs() {
  try {
    const response = yield call(fetchSongsApi);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* songsSaga() {
  yield takeEvery('songs/fetchSongs', fetchSongs);
}

export default songsSaga;
