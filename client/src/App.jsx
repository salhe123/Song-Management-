import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { css, Global } from "@emotion/react";
import SongList from "./components/SongList";
import AddSong from "./components/AddSong";
import UpdateSong from './components/updateSong';

function App() {
  const globalStyles = css`
    body {
      background-color: #C0C3D8; 
    }
  `;

  return (
    <div className="App">
      <Global styles={globalStyles} />
      <Router>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/AddSong" element={<AddSong />} />
        <Route path="/updateSong/:id" element={<UpdateSong />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
