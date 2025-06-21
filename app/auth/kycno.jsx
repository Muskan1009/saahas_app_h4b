import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getItemAsync, setItemAsync } from 'expo-secure-store';

export default function KycScreen() {

  const router = useRouter();

  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isLoading, setisLoading] = useState(false)
  const [isError, setIsError] = useState('');
  const [isSuccess, setIsSuccess] = useState('')

  const handleInitiateKYC = async () => {

    setisLoading(true);
    setIsError('');
    setIsSuccess('');

    if (aadhaarNumber.length !== 12) {
      setisLoading(false);
      setIsError('Aadhaar number must be 12 digits long');
      return;
    }

    if (aadhaarNumber === "999999999999") {
      setisLoading(false);
      setIsError('This Aadhaar number is only valid for testing purposes');
      router.push('/auth/kycotp');
      return;
    }

    const token = await getItemAsync('token');

    await fetch(`${process.env.EXPO_PUBLIC_API_URL}users/kyc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': `Authorization ${token}`,
      },
      body: JSON.stringify({ aadhaarNumber }),
    })
      .then(res => res.json())
      .then(async (result) => {

        setisLoading(false);

        console.log(result);

        if (result.success && result.data.redirect_type === 'kyc_otp') {
          router.push('/auth/kycotp');
          setIsSuccess(result.message);
        } else {
          setIsError(result.message);
        }

      })
      .catch(error => {
        setisLoading(false);
        setIsError(error.message);
      })

  }

  return (
    <SafeAreaView className="flex-1 bg-black px-8 py-6">
      {/* Top Bar */}
      <View className="flex-row items-center pt-4 justify-between">
        <TouchableOpacity
          onPress={() => router.push('/auth/welcome')}>
          <View className="border-[#FFFFFF6E] border-[2px] w-10 h-10 rounded-full items-center justify-center">
            <Ionicons name="arrow-back" size={22} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-medium text-white">KYC</Text>
        <View className="w-8" /> {/* Same width as back button to balance */}
      </View>

      {/* Step Progress */}
      <View className="flex-row justify-start items-center gap-4 mt-6">
        <View className="w-[30%] h-1 bg-[#BBF389] rounded-full" />
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
      </View>

      {/* Main Content */}
      <View className="pt-20">
        <Text className="text-center text-white text-xl font-semibold pb-2">Enter your Aadhaar Number</Text>
        <Text className="text-center text-white mb-8 text-sm">
          To maintain the authenticity of the platform we need to do a quick KYC.
        </Text>

        {/* Aadhaar Input */}
        <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2">
          <FontAwesome5 name="id-card" size={18} color="#9CA3AF" />
          <TextInput
            value={aadhaarNumber}
            onChangeText={setAadhaarNumber}
            placeholder="Enter Aadhaar Number"
            keyboardType="numeric"
            className="ml-3 flex-1 text-base text-white"
            maxLength={12}
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

        <Text className="text-xs text-[#adadad] text-center mb-4 leading-4">
          We never store your Aadhaar information only your Aadhaar number will be save in encrypted format it will be just use for one time identity verification. By continuing you agree terms of usage and privacy policy of the platform.
        </Text>

        <TouchableOpacity
          onPress={handleInitiateKYC}
          disabled={isLoading || aadhaarNumber.length !== 12}
          className=" bg-[#BBF389] rounded-3xl py-3 "
        >
          {
            isLoading ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <Text className="text-black text-center font-semibold text-lg">Verify Aadhaar</Text>
            )
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

