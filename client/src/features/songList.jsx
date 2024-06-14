// import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, Box } from '@styled-system/css';

const SongList = () => {
  const songs = useSelector((state) => state.songs);

  return (
    <Flex flexDirection="column">
      <h2>Song List</h2>
      <ul>
        {songs.map((song) => (
          <Box as="li" key={song.id} mb={2}>
            {song.title} - {song.artist}
          </Box>
        ))}
      </ul>
    </Flex>
  );
};

export default SongList;
