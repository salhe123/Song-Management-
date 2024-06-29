import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from './songsSlice'; // Adjust the path as per your project structure
import rootSaga from './songsSaga'; // Adjust the path as per your project structure

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songsReducer, // Include your songsReducer in the root reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable default thunk middleware if not needed
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga); // Run your rootSaga

export default store;
