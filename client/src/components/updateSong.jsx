import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateSong, fetchSongs } from "../features/songs/songsSlice";
/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";

const formStyle = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ece7e7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  label {
    display: block;
    margin-bottom: 10px;
    color: #555;
  }

  input[type="text"],
  select,
  input[type="file"],
  button {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background: #d4d5e2;
    color: black;
  }

  input::placeholder,
  select::placeholder {
    color: black;
  }

  select {
    color: black;
  }

  select option[value=""][disabled] {
    display: none;
  }

  input[type="file"] {
    color: black;
  }

  button {
    background-color: #acb4e9;
    color: black;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #777fb3;
  }
`;

const globalStyles = css`
  body {
    display: flex;
    justify-content: center;
  }
`;

const UpdateSong = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songs = useSelector((state) => state.songs.songs);
  const song = songs.find((song) => song.id === parseInt(id));

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!song) {
      dispatch(fetchSongs());
      console.log("chek the fecth")
    } else {
      setTitle(song.title);
      setArtist(song.artist);
      setAlbum(song.album);
      setYear(song.year);
      console.log("not fecth")
    }
  }, [dispatch, song]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && artist && album && year && id) {
      const songData = {
        id: parseInt(id), // Ensure id is passed as integer
        title,
        artist,
        album,
        year,
        audioFile, // Assuming audioFile and imageFile are already file objects
        imageFile,
      };

      dispatch(updateSong(songData));
      navigate("/");
    }
  };

  const handleAudioFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div css={formStyle}>
      <Global styles={globalStyles} />
      <h2>Update Song</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter song title"
          required
        />

        <label>Artist:</label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Enter artist name"
          required
        />

        <label>Album:</label>
        <input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          placeholder="Enter album name"
          required
        />

        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)} required>
          <option value="" disabled>
            Select year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label>Audio File:</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioFileChange}
        />

        <label>Image File:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
        />

        <button type="submit">Update Song</button>
      </form>
    </div>
  );
};

export default UpdateSong;
