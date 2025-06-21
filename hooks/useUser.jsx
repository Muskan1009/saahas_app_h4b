// hooks/useUser.js

import {
    registerUser,
    loginUser,
    verifyOTP,
    fetchUserDetails,
    initiateKYC,
    verifyKYC,
} from '../apis/userApis';

import { useMutation, useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

// REGISTER
export const useRegister = () => {
    return useMutation({ mutationFn: registerUser });
}

// LOGIN
export const useLogin = () => {
    return useMutation({ mutationFn: loginUser });
}

// VERIFY OTP
export const useVerifyOTP = () => {
    return useMutation({
        mutationFn: async (data) => {
            const res = await verifyOTP(data);
            if (res.data?.data?.token) {
                await SecureStore.setItemAsync('token', res.data.data.token);
            }
            return res;
        },
    });
}

// USER DETAILS
export const useFetchUser = () => {
    return useQuery({
        queryKey: ['userDetails'],
        queryFn: fetchUserDetails,
    });
}

// INITIATE KYC
export const useInitiateKYC = () => {
    return useMutation({ mutationFn: initiateKYC });
}

// VERIFY KYC
export const useVerifyKYC = () => {
    return useMutation({ mutationFn: verifyKYC });
}