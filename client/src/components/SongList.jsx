import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSongs, deleteSong } from "../features/songs/songsSlice";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const songListStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  list-style-type: none;

  h2 {
    color: black;
  }

  li {
    padding: 20px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #A8A9B1;
    transition: transform 0.3s, box-shadow 0.3s;
    color: black;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }

    button {
      padding: 8px 16px;
      background-color: #acb4e9;
      color: white;
      text-decoration: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #b91c1c;
      }
    }

    a {
      padding: 8px 16px;
      background-color: #acb4e9;
      color: white;
      text-decoration: none;
      border-radius: 14px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #576a9b;
      }
    }
  }

  h3 {
    font-weight: bold;
    color: black;
  }

  p {
    color: black;
  }

  audio {
    width: 100%;
    margin-top: 10px;
  }
`;

const addSongStyle = css`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: #5b6ff1;
  color: white;
  text-decoration: none;
  border-radius: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dcdee9;
  }
`;

const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);
  const status = useSelector((state) => state.songs.status);
  const error = useSelector((state) => state.songs.error);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSong(id));
  };

  if (status === "loading") {
    return (
      <div css={loadingStyle}>
        <div className="loader"></div>
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error:when it loaded {error}</div>;
  }

  return (
    <div>
      <h2 css={songListStyle}>Song List</h2>
      <ul css={songListStyle}>
        {songs.map((song) => (
          <li key={song.id}>
            <h3>{song.title}</h3>
            <p>Artist: {song.artist}</p>
            <p>Album: {song.album}</p>
            <p>Year: {song.year}</p>
            <audio controls>
              <source src={song.audio_file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div>
              <Link to={`/updateSong/${song.id}`}>Edit</Link>
              <button onClick={() => handleDelete(song.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to={"/addSong"} css={addSongStyle}>
        Add Song
      </Link>
    </div>
  );
};

export default SongList;
