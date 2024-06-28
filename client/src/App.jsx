import { BrowserRouter } from "react-router-dom";
import { css, Global } from "@emotion/react";
import SongList from "./components/SongList";
import SongForm from "./components/SongForm";

function App() {
  const globalStyles = css`
    body {
      background-color: #acb4e9; /* This is the hex code for Tailwind's gray-400 */
    }
  `;

  return (
    <div className="App">
      <Global styles={globalStyles} />
      <BrowserRouter>
        <SongList />
      </BrowserRouter>
    </div>
  );
}

export default App;
