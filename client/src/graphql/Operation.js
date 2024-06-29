// src/graphql/Operation.js

import { gql } from '@apollo/client';

export const fetchGraphQL = gql`
  query FetchSongs {
    songs {
      id
      title
      artist
      album
      year
      audio_file
      image_url
    }
  }
`;

export const CREATE_SONG = gql`
  mutation InsertMusics($year: Int, $album: String, $artist: String, $audio_file: String, $image_url: String, $title: String) {
    insert_musics(objects: {year: $year, album: $album, artist: $artist, audio_file: $audio_file, image_url: $image_url, title: $title}) {
      affected_rows
      returning {
        id
        year
        album
        artist
        audio_file
        image_url
        title
        created_at
      }
    }
  }
`;

export const UPDATE_SONG = gql`
  mutation UpdateSong($id: Int!, $title: String!, $artist: String!, $album: String!, $year: Int!, $audio_file: String!, $image_url: String!) {
    update_songs_by_pk(pk_columns: { id: $id }, _set: { title: $title, artist: $artist, album: $album, year: $year, audio_file: $audio_file, image_url: $image_url }) {
      id
      title
      artist
      album
      year
      audio_file
      image_url
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: Int!) {
    delete_songs(where: { id: { _eq: $id } }) {
      returning {
        id
        title
        artist
        album
        year
        audio_file
        image_url
      }
    }
  }
`;
