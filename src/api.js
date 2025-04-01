import axios from 'axios';

// Create an instance of axios with the base URL
const api = axios.create({
  // baseURL: "http://3.148.114.153:8000"
  baseURL: "http://localhost:8000"
});

// Export the Axios instance
export default api;