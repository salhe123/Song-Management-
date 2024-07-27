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
  mutation DeleteMusic($id: Int!) {
    delete_Music(where: { id: { _eq: $id } }) {
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
