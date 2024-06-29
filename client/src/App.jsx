import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { css, Global } from "@emotion/react";
import SongList from "./components/SongList";
import AddSong from "./components/AddSong";
import UpdateSong from './components/updateSong';

function App() {
  const globalStyles = css`
    body {
      background-color: #acb4e9; /* This is the hex code for Tailwind's gray-400 */
    }
  `;

  return (
    <div className="App">
      <Global styles={globalStyles} />
      <Router>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/AddSong" element={<AddSong />} />
        <Route path="/updateSong" element={<UpdateSong />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
