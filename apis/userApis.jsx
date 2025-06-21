// api/user.js

import axiosInstance from '../libs/AxiosInstance';

// REGISTER
export const registerUser = (data) =>
    axiosInstance.post('/users/register', data);

// LOGIN
export const loginUser = (data) =>
    axiosInstance.post('/users/login', data);

// VERIFY OTP
export const verifyOTP = (data) =>
    axiosInstance.post('/users/verify-otp', data);

// GET USER DETAILS
export const fetchUserDetails = () =>
    axiosInstance.get('/users');

// KYC INITIATE
export const initiateKYC = (data) =>
    axiosInstance.post('/users/kyc', data);

// KYC VERIFY
export const verifyKYC = (data) =>
    axiosInstance.post('/users/kyc/verify', data);
