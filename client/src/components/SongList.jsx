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
`;

const listItemStyle = css`
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #a8a9b1;
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

const addSongButtonWrapperStyle = css`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const addSongStyle = css`
  display: block;
  padding: 10px 20px;
  background-color: #1b241b;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
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
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div css={addSongButtonWrapperStyle}>
        <Link to={"/addSong"} css={addSongStyle}>
          Add Song
        </Link>
      </div>
      <h2 css={songListStyle}>Song List</h2>
      <ul css={songListStyle}>
        {songs.map((song) => (
          <li key={song.id} css={listItemStyle}>
            <div
              style={{
                backgroundImage: `url(${song.image})`,
                backgroundSize: "cover",
                height: "150px",
                borderRadius: "8px",
              }}
            >
              <h3>{song.title}</h3>
            </div>
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
    </div>
  );
};

export default SongList;
