import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSong } from "../features/songs/songsSlice"; // Ensure the action is named correctly
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

const AddSong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const years = Array.from({ length: 50 }, (_, index) => 2024 - index); // Generate last 50 years

 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result); // This will be a Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const songData = {
      title,
      artist,
      album,
      year,
      audioFile, // Base64 string
      imageFile, // Base64 string
    };

    console.log("Song Data:", songData);

    // Dispatch action to create song with the collected data
    dispatch(createSong(songData));

    // Reset form fields after submission if needed
    setTitle("");
    setArtist("");
    setAlbum("");
    setYear("");
    setAudioFile(null);
    setImageFile(null);

    // Navigate to the home page or another route after submission
    navigate("/");
  };

  return (
    <div css={formStyle}>
      <Global styles={globalStyles} />
      <h2>Add New Song</h2>
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
          <option value="" disabled>Select year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        {/* <label>Audio File:</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => handleFileChange(e, setAudioFile)}
        /> */}

        <label>Image File:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImageFile)}
        />

        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;
