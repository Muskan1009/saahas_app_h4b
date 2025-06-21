// lib/axiosInstance.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const AxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosInstance.interceptors.request.use(

    async (config) => {

        const token = await SecureStore.getItemAsync('token');

        if (token) {
            config.headers['token'] = `Authorization ${token}`; // or 'token': `Authorization ${token}` if that's your backend format
        }

        return config;

    },
    (error) => {
        return null;
    }
    
);

export default AxiosInstance;
