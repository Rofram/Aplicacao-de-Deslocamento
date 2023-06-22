import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://api-deslocamento.herokuapp.com/api/v1",
  validateStatus: () => true,
});

export default axiosInstance;