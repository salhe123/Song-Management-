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

const loadingContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  width: 100%; /* Full width */
`;

const spinnerStyle = css`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
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
    position: relative;
    height: 150px; /* Adjust as needed */
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the container */
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
const socialIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Adjust gap between icons if needed */
  height: 10vh;
`;

const iconStyle = css`
  display: inline-flex;
  width: 40px; /* Adjust the size of the icons if needed */
  height: 40px;
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
      <div css={loadingContainerStyle}>
        <div css={spinnerStyle}></div>
      </div>
    );
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
            <div>
              <img src={song.image_file} alt={song.title} />
            </div>
            <h3>{song.title}</h3>
            <p>Artist: {song.artist}</p>
            <p>Album: {song.album}</p>
            <p>Year: {song.year}</p>
            <audio controls>
              <source src={song.audio_file} type="audio/mpeg" />
            </audio>
            <div>
              <Link to={`/updateSong/${song.id}`}>Edit</Link>
              <button onClick={() => handleDelete(song.id)}>Delete</button>
            </div>
          </li>
         

        ))}
      </ul>
      <div css={socialIcon}>
    <a href="https://github.com/salhe123" target="_blank" rel="noopener noreferrer">
      <svg role="img" fill="#181717" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" css={iconStyle}>
        <path d="M12 0.297C5.374 0.297 0 5.672 0 12.297c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.261.82-.579 0-.285-.011-1.04-.017-2.04-3.338.725-4.042-1.613-4.042-1.613-.546-1.387-1.333-1.758-1.333-1.758-1.089-.744.083-.729.083-.729 1.205.085 1.839 1.238 1.839 1.238 1.07 1.833 2.807 1.304 3.492.997.108-.775.419-1.305.763-1.605-2.665-.302-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.007-.322 3.301 1.23.956-.266 1.983-.398 3.003-.403 1.02.005 2.048.137 3.006.403 2.292-1.553 3.298-1.23 3.298-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.625-5.478 5.92.43.37.814 1.096.814 2.207 0 1.592-.015 2.874-.015 3.262 0 .32.216.694.825.577C20.565 22.092 24 17.597 24 12.297c0-6.625-5.373-12-12-12"/>
      </svg>
    </a>
    <a href="https://www.linkedin.com/in/salhe-seid-9a231b284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
      <svg role="img" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" css={iconStyle}>
        <path d="M22.23 0H1.77C.79 0 0 .774 0 1.72v20.56C0 23.227.79 24 1.77 24h20.46C23.21 24 24 23.226 24 22.28V1.72C24 .773 23.21 0 22.23 0zM7.12 20.452H3.56V8.896h3.56v11.556zM5.34 7.308a2.057 2.057 0 110-4.114 2.057 2.057 0 010 4.114zm15.1 13.144h-3.56v-5.56c0-1.325-.027-3.03-1.848-3.03-1.85 0-2.135 1.445-2.135 2.936v5.654H9.33V8.896h3.417v1.584h.048c.476-.898 1.638-1.848 3.37-1.848 3.6 0 4.27 2.372 4.27 5.457v6.363z"/>
      </svg>
    </a>
  </div>
    </div>
  );
};

export default SongList;
