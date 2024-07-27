import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSong } from "../features/songs/songsSlice"; // Ensure the action is named correctly
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const formStyle = css`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f3f4f6;
`;

const labelStyle = css`
  display: block;
  margin-bottom: 10px;
`;
const AddSongCss = css`
  display: block;
  margin-bottom: 10px;
  text-align: center; /* Center text horizontally */
`;

const inputStyle = css`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const buttonStyle = css`
  padding: 10px 20px;
  background-color: #6274ee;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #576a9b;
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

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // Convert file to Base64 string
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
    <div>
      <h2 css={AddSongCss}>Add New Song</h2>
      <form css={formStyle} onSubmit={handleSubmit}>
        <label css={labelStyle}>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            css={inputStyle}
            required
          />
        </label>
        <label css={labelStyle}>
          Artist:
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            css={inputStyle}
            required
          />
        </label>
        <label css={labelStyle}>
          Album:
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            css={inputStyle}
            required
          />
        </label>
        <label css={labelStyle}>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            css={inputStyle}
            list="year-list"
            required
          />
          <datalist id="year-list">
            {years.map((y) => (
              <option key={y} value={y} />
            ))}
          </datalist>
        </label>
        {/* <label css={labelStyle}>
          Audio File:
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setAudioFile)}
            accept="audio/*"
            css={inputStyle}
            required
          />
        </label> */}
        <label css={labelStyle}>
          Image File:
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setImageFile)}
            accept="image/*"
            css={inputStyle}
            required
          />
        </label>
        <button type="submit" css={buttonStyle}>
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSong;
