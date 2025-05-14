import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173/api', // Укажи напрямую URL API
});

// Остальной код без изменений
export const getCars = () => api.get('/cars');
export const getCarById = (id) => api.get(`/cars/${id}`);
export const createBooking = (bookingData) => api.post('/booking', bookingData);
export const createApplication = (applicationData) => api.post('/applications', applicationData);

export default api;
