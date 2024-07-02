// src/graphql/Operation.js
import { gql } from '@apollo/client';

export const fetchGraphQL = gql`
  query GetMusics {
    musics {
      id
      year
      album
      artist
      audio_file
      image_file
      title
      created_at
    }
  }
`;

export const CREATE_SONG = gql`
  mutation InsertMusics($year: Int, $album: String, $artist: String, $title: String ) {
  insert_musics(objects: {year: $year, album: $album, artist: $artist, title: $title}) {
    affected_rows
    returning {
      audio_file
			image_file
			id
			year
			album
			artist
			title
			created_at
    }
  }
}
    
`;

export const UPDATE_SONG = gql`
  mutation UpdateMusic($id: Int!, $year: Int, $album: String, $artist: String, $audio_file: String, $image_file: String, $title: String) {
    update_musics(where: {id: {_eq: $id}}, _set: {year: $year, album: $album, artist: $artist, audio_file: $audio_file, image_file: $image_file, title: $title}) {
      affected_rows
      returning {
        id
        year
        album
        artist
        audio_file
        image_file
        title
        created_at
      }
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
