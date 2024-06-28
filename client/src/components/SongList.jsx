import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSongs } from "../features/songs/songsSlice";
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
    background-color: white;
    transition: transform 0.3s, box-shadow 0.3s;
    color: black;

    &:hover {
    cursor:pointer;
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
      background-color: #acb4e9; /* Tailwind blue-600 */
      color: white;
      text-decoration: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #b91c1c; /* Darker shade of red */
      }
    }

    a {
      padding: 8px 16px;
      background-color: #acb4e9; /* Tailwind blue-600 */
      color: white;
      text-decoration: none;
      border-radius: 14px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #576A9B; /* Darker shade of blue */
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
    
`;
const addSongStyle = css`
  position: fixed;
  Top: 20px;
  right: 20px;
  padding: 8px 16px;
      background-color: #5B6FF1; /* Tailwind blue-600 */
      color: white;
      text-decoration: none;
      border-radius: 14px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #DCDEE9; /* Darker shade of blue */
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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
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
            <div>
              <Link to={`/edit/${song.id}`}>Edit</Link>
              <button>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to={'/add-song'} css={addSongStyle}>
        Add Song
      </Link>
    </div>
  );
};

export default SongList;
