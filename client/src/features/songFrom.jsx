// import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSong } from './songSlice';
import { Flex, Box, Input, Button } from '@styled-system/css';

const SongForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSong({ title, artist }));
    setTitle('');
    setArtist('');
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} flexDirection="column">
      <Box mb={2}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <Input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </Box>
      <Button type="submit">Add Song</Button>
    </Flex>
  );
};

export default SongForm;
