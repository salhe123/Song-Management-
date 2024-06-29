import { call, put, takeLatest } from 'redux-saga/effects';
import { useFetchSongs, useCreateSong, useUpdateSong, useDeleteSong } from '../../api/songsApi'; // Adjust the path as per your project structure
import { fetchSongsSuccess, fetchSongsFailure } from './songsSlice';

function* fetchSongsSaga() {
  try {
    const { data } = yield call(useFetchSongs); // Call useFetchSongs hook from songsApi.js
    yield put(fetchSongsSuccess(data.songs)); // Dispatch fetchSongsSuccess action with fetched songs
  } catch (error) {
    yield put(fetchSongsFailure(error.message)); // Dispatch fetchSongsFailure action on error
  }
}

function* createSongSaga(action) {
  try {
    const { input } = action.payload;
    const { data } = yield call(useCreateSong, { variables: { input } }); // Call useCreateSong hook with input variables
    yield put(createSongSuccess(data.createSong)); // Dispatch createSongSuccess action with created song data
  } catch (error) {
    yield put(createSongFailure(error.message)); // Dispatch createSongFailure action on error
  }
}

function* updateSongSaga(action) {
  try {
    const { id, input } = action.payload;
    const { data } = yield call(useUpdateSong, { variables: { id, input } }); // Call useUpdateSong hook with id and input variables
    yield put(updateSongSuccess(data.updateSong)); // Dispatch updateSongSuccess action with updated song data
  } catch (error) {
    yield put(updateSongFailure(error.message)); // Dispatch updateSongFailure action on error
  }
}

function* deleteSongSaga(action) {
  try {
    const { id } = action.payload;
    yield call(useDeleteSong, { variables: { id } }); // Call useDeleteSong hook with id variable
    yield put(deleteSongSuccess(id)); // Dispatch deleteSongSuccess action with deleted song id
  } catch (error) {
    yield put(deleteSongFailure(error.message)); // Dispatch deleteSongFailure action on error
  }
}

// Watcher saga: watches for specific actions and calls corresponding worker saga
export default function* songsSaga() {
  yield takeLatest('songs/fetchSongs', fetchSongsSaga); // Listen for fetchSongs action
  yield takeLatest('songs/createSong', createSongSaga); // Listen for createSong action
  yield takeLatest('songs/updateSong', updateSongSaga); // Listen for updateSong action
  yield takeLatest('songs/deleteSong', deleteSongSaga); // Listen for deleteSong action
}
