import apiClient from './apiClient';

const base_path = '/users';

const userLogin = async (formData: {email: string, password: string}) => {
  try {
    const response = await apiClient.post(`${base_path}/login`, formData);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

interface register_user {
  first_name: string;
	last_name: string;
	email: string;
	dob: Date;
	password: string;
	confirm_password: string;
	isTermsAccepted: boolean;
} 

const registerUser = async (formData: register_user) => {
  try {
    const response = await apiClient.post(`${base_path}/register`, formData);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

const userLogout = async (token_data: {refresh_token: string, access_token: string}) => {
  try {
    const response = await apiClient.post(`${base_path}/logout`, token_data);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

export {
  userLogin, 
  userLogout,
  registerUser
}