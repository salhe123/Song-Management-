// import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs } from '../features/songs/songsSlice';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const songListStyle = css`
  list-style-type: none;
  padding: 0;

  li {
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
  }
`;

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs.songs);
  const status = useSelector(state => state.songs.status);
  const error = useSelector(state => state.songs.error);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Song List</h2>
      <ul css={songListStyle}>
        {songs.map(song => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
