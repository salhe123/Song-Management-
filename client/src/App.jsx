// import React from 'react';
import { Provider } from 'react-redux';
import store from './features/songs/store';
import SongList from './components/SongList';
import SongForm from './components/SongForm';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SongForm />
        <SongList />
      </div>
    </Provider>
  );
}

export default App;
