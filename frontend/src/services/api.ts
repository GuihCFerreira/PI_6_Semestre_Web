// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pi-6-semestre-1edb53abee65.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
