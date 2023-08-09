import axios from 'axios';
import config from '../config'

const apiClient = axios.create({
  baseURL: config.api_url
});

// Add request interceptor
apiClient.interceptors.request.use(config => {
  // Do something before request is sent
  const user_data = localStorage.getItem('user');
  if(user_data){
    const parsed_data = JSON.parse(user_data);
    
    config.headers.Authorization = `Bearer ${parsed_data.tokens.access.token}`;
  }
  return config;
});

// Add response interceptor
apiClient.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx
  // Do something with response data
  return response;
});


export default apiClient;