import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchSongsApi = () => axios.get(API_URL);
