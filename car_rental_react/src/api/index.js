import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getCars = () => api.get('/cars');
export const getCarById = (id) => api.get(`/cars/${id}`);

export default api;