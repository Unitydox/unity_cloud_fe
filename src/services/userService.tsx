import apiClient from './apiClient';
import { getUrlQueryFromObj } from "utils";
import { IRegisterUser, IThirdPartyRegisterUser, ITokens, IProfileForm } from 'models/user';

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

const registerUser = async (formData: IRegisterUser) => {
  try {
    const response = await apiClient.post(`${base_path}/register`, formData);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

const registerOrLogin = async (formData: IThirdPartyRegisterUser) => {
  try {
    const response = await apiClient.post(`${base_path}/thirdPartyLogin`, formData);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

const userLogout = async (token_data: ITokens) => {
  try {
    const response = await apiClient.post(`${base_path}/logout`, token_data);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

const userMailVerification = async (userId: string) => {
  try {
    const response = await apiClient.post(`${base_path}/verifyUserFromLink`, {userId});   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

const isUserVerified = async (userId: string) => {
  try {
    const response = await apiClient.get(`${base_path}/isUserVerified${getUrlQueryFromObj({userId})}`);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

const getUserDetails = async (userId: string) => {
  try {
    const response = await apiClient.get(`${base_path}/getUserDetails${getUrlQueryFromObj({userId})}`);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

const updateUserDetails = async (formData: IProfileForm) => {
  try {
    const response = await apiClient.put(`${base_path}/updateUserDetails`, formData);   
    return response.data;
  } catch(error) {
    // throw error; 
    return error;
  }
}

export {
  userLogin, userLogout, registerUser, registerOrLogin, userMailVerification, isUserVerified, 
  getUserDetails, updateUserDetails
}