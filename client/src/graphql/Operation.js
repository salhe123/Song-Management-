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
 mutation InsertMusics($year: Int, $album: String, $artist: String, $audio_file: String, $image_file: String, $title: String) {
  insert_musics(objects: {year: $year, album: $album, artist: $artist, audio_file: $audio_file, image_file: $image_file, title: $title}) {
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

export const UPDATE_SONG = gql`
  mutation UpdateMusic($id: Int!, $title: String, $artist: String, $album: String, $year: Int, $audioFile: String, $imageFile: String) {
    update_musics_by_pk(pk_columns: {id: $id}, _set: {title: $title, artist: $artist, album: $album, year: $year, audio_file: $audioFile, image_file: $imageFile}) {
      id
      title
      artist
      album
      year
      audio_file
      image_file
      created_at
    }
  }
`;


export const DELETE_SONG = gql`
  mutation DeleteSong($id: Int!) {
  delete_musics(where: { id: { _eq: $id } }) {
    affected_rows
  }
}
`;
