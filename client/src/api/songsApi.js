// src/api/songsApi.js

import { useQuery, useMutation } from '@apollo/client';
import { fetchGraphQL, CREATE_SONG, UPDATE_SONG, DELETE_SONG } from '../graphql/Operation';

export const useFetchSongs = () => {
  return useQuery(fetchGraphQL);
};

export const useCreateSong = () => {
  return useMutation(CREATE_SONG);
};

export const useUpdateSong = () => {
  return useMutation(UPDATE_SONG);
};

export const useDeleteSong = () => {
  return useMutation(DELETE_SONG);
};
