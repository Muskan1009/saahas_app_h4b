
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

export default function OtpScreen() {

const router = useRouter();  

  const [otp, setOtp] = useState('');

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('');
  const [isSuccess, setIsSuccess] = useState('')

  const handleVerifyKYC = async () => {

    setIsLoading(true);
    setIsError('');
    setIsSuccess('');

    // if (otp === '999999') {
    //   setIsLoading(false);
    //   setIsError('This is only valid for testing purposes');
    //   router.push('/home');
    //   return;
    // }

    const token = await getItemAsync('token');

    await fetch(`${process.env.EXPO_PUBLIC_API_URL}users/kyc/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': `Authorization ${token}`
      },
      body: JSON.stringify({ otp }),
    })
      .then(res => res.json())
      .then(async (result) => {

        if (result.success) {
          setIsLoading(false);
          setIsSuccess(result.message);
          await deleteItemAsync('token');
          await setItemAsync('token', result.data.token);
          router.push('/home');
        } else {
          setIsLoading(false);
          setIsError(result.message);
        }

      }).catch(error => {
        setIsLoading(false);
        setIsError(error.message);
      })

  }

  return (
    <SafeAreaView className="flex-1 bg-black px-8 py-6">
      {/* Top Bar */}
      <View className="flex-row items-center pt-4 justify-between">
        <TouchableOpacity
          onPress={() => router.push('/auth/kycno')}>
          <View className="border-[#FFFFFF6E] border-[2px] w-10 h-10 rounded-full items-center justify-center">
            <Ionicons name="arrow-back" size={22} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-medium text-white">KYC</Text>
        <View className="w-8" /> {/* Same width as back button to balance */}
      </View>

      {/* Step Progress */}
      <View className="flex-row justify-start items-center gap-4 mt-6">
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
        <View className="w-[30%] h-1 bg-[#BBF389] rounded-full" />
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
      </View>

      {/* Main Content */}
      <View className="pt-20">
        <Text className="text-center text-white text-xl font-semibold mb-4">Enter your Verification OTP</Text>
        <Text className="text-center text-white mb-12 w-80">
          To maintain the authenticity of the platform we need to do a quick KYC.
        </Text>

        {/* OTP Input */}
        <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2">
          <Entypo name="dots-three-horizontal" size={18} color="#9CA3AF" />
          <TextInput
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
            keyboardType="numeric"
            secureTextEntry
            className="ml-3 flex-1 text-base text-white"
            maxLength={6}
          />
        </View>
      </View>

      {
        isError && (
          <Text className="text-red-500 text-center mt-4">{isError}</Text>
        )
      }

      {
        isSuccess && (
          <Text className="text-green-500 text-center mt-4">{isSuccess}</Text>
        )
      }

      {/* Bottom Note + Button */}
      <View className="flex-1 justify-end mb-6">

        <Text className="text-xs text-[#adadad] text-center pb-4 leading-4">
          We never store your Aadhaar information, only your Aadhaar number will be saved in encrypted format. It will be used just once for identity verification. By continuing you agree to terms of usage and privacy policy of the platform.
        </Text>

        <TouchableOpacity
          className="bg-[#BBF389] rounded-full py-3"
          disabled={isLoading}
          onPress={handleVerifyKYC}
        >
          {
            isLoading ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <Text className="text-black text-center font-medium text-base">Verify</Text>
            )
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
