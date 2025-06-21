import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getItemAsync, setItemAsync } from 'expo-secure-store';

export default function Otp() {

    const router = useRouter();

    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const inputRefs = useRef([]);

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to next input if one digit is entered
        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState('');

    const handleVerify = async () => {

        setIsLoading(true);
        setIsError('');

        const userID = await getItemAsync('userID');

        await fetch(`${process.env.EXPO_PUBLIC_API_URL}users/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp: otp.join(''), userID })
        })
            .then(res => res.json())
            .then(async (result) => {

                setIsLoading(false);

                if (result.success) {

                    if (result.data.redirect_type === 'new_kyc') {
                        await setItemAsync('token', result.data.token);
                        router.push('/auth/welcome');
                    } else if (result.data.redirect_type === 'home') {
                        await setItemAsync('userID', result.data.userID);
                        await setItemAsync('token', result.data.token);
                        router.push('/home');
                    }

                } else {

                    setIsError(result.message);

                }

            }).catch((error) => {
                setIsLoading(false);
                setIsError(error.message);
            });

    }

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-black px-8 py-20"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View className="items-center mb-8">
                <Text className="text-2xl font-semibold text-white">OTP Verification</Text>
                <Text className="text-center text-white/80 mt-3 leading-relaxed text-sm">
                    Enter the 6-digit OTP
                </Text>
            </View>

            <View className="flex-row justify-center gap-3 my-6">
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-10 h-12 border border-gray-400 rounded-md text-center text-lg text-white"
                        keyboardType="visible-password"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                    />
                ))}
            </View>

            <Text className="text-center text-white mt-2">
                Didn’t received ?{' '}
                <Text className="text-[#BBF389] font-semibold">Resend code</Text>
            </Text>

            {/* Error Message */}
            {isError && (
                <View className="bg-red-500 rounded-lg p-4 mt-6">
                    <Text className="text-white text-center">{isError}</Text>
                </View>
            )}

            <View className="flex-1 justify-end">
                <TouchableOpacity
                    className=" bg-[#BBF389] py-3 rounded-3xl"
                    disabled={isLoading}
                    onPress={handleVerify}
                >
                    {
                        isLoading ? (
                            <ActivityIndicator size="small" color="black" />
                        ) : (
                            <Text className="text-black text-center font-semibold text-lg">Verify</Text>
                        )
                    }
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
