import apiClient from './apiClient';

const base_path = '/users';

const userLogin = async (formData: {email: string, password: string}) => {
  try {
    const response = await apiClient.post(`${base_path}/auth/login`, formData);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

const userLogout = async (token_data: {refresh_token: string, access_token: string}) => {
  try {
    const response = await apiClient.post(`${base_path}/auth/logout`, token_data);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

export {
    userLogin, 
    userLogout
}