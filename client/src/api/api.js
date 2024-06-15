// api.js
import axios from 'axios';

const API_URL = 'http://your-api-url.com'; // Replace with your actual API URL

export const fetchSongsApi = () => {
  return axios.get(`${API_URL}/songs`);
};

export const createSongApi = (songData) => {
  return axios.post(`${API_URL}/songs`, songData);
};

export const updateSongApi = (id, songData) => {
  return axios.put(`${API_URL}/songs/${id}`, songData);
};
