// import React from 'react';
import { SongForm } from './features/songFrom';
import { SongList } from './features/songList' ;

const App = () => {
  return (
    <div>
      <h1>My Songs App</h1>
      <SongForm />
      <SongList />
    </div>
  );
};

export default App;
