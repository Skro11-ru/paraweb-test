import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mocki.io/v1/a5814d24-4e22-49fc-96d1-0e9ae2952afc',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;
