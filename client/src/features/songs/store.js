import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from './songsSlice'; // Adjust the path to your songsSlice file
import songsSaga from './songsSaga'; // Adjust the path to your songsSaga file

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable default thunk middleware
      serializableCheck: false
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(songsSaga);

export default store;
