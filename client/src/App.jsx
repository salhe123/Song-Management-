// import React from 'react';
import { SongForm } from './features/SongFrom';
import { SongList } from './features/SongList';

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
