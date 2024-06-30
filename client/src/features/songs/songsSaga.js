import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchGraphQL, CREATE_SONG, UPDATE_SONG, DELETE_SONG } from '../../graphql/Operation'; // Adjust the path as per your project structure
import { fetchSongsSuccess, fetchSongsFailure } from './songsSlice';

function* fetchSongsSaga() {
  try {
    const { data } = yield call(fetchGraphQL); // Call useFetchSongs hook from songsApi.js
    yield put(fetchSongsSuccess(data.musics)); // Dispatch fetchSongsSuccess action with fetched songs
  } catch (error) {
    yield put(fetchSongsFailure(error.message)); // Dispatch fetchSongsFailure action on error
  }
}

function* createSongSaga(action) {
  try {
    const { input } = action.payload;
    const { data } = yield call(CREATE_SONG, { variables: { input } }); // Call useCreateSong hook with input variables
    yield put(createSongSuccess(data.CREATE_SONG)); // Dispatch createSongSuccess action with created song data
  } catch (error) {
    yield put(createSongFailure(error.message)); // Dispatch createSongFailure action on error
  }
}

function* updateSongSaga(action) {
  try {
    const { id, input } = action.payload;
    const { data } = yield call(UPDATE_SONG, { variables: { id, input } }); // Call useUpdateSong hook with id and input variables
    yield put(updateSongSuccess(data.UPDATE_SONG)); // Dispatch updateSongSuccess action with updated song data
  } catch (error) {
    yield put(updateSongFailure(error.message)); // Dispatch updateSongFailure action on error
  }
}

function* deleteSongSaga(action) {
  try {
    const { id } = action.payload;
    yield call(DELETE_SONG, { variables: { id } }); // Call useDeleteSong hook with id variable
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
