// import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSong, updateSong } from '../features/songs/songsSlice';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const formStyle = css`
  display: flex;
  flex-direction: column;

  input, button {
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
  }

  button {
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const SongForm = ({ existingSong = {}, isEditing = false }) => {
  const [title, setTitle] = useState(existingSong.title || '');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateSong({ ...existingSong, title }));
    } else {
      dispatch(addSong({ title }));
    }
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} css={formStyle}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Song Title"
      />
      <button type="submit">{isEditing ? 'Update Song' : 'Add Song'}</button>
    </form>
  );
};

export default SongForm;
