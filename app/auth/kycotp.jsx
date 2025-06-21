
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function OtpScreen() {
  const [otp, setOtp] = useState('');
  const router = useRouter();

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
            className="ml-3 flex-1 text-base text-black"
            maxLength={6}
          />
        </View>
      </View>

      {/* Bottom Note + Button */}
      <View className="flex-1 justify-end mb-6">
        <Text className="text-xs text-[#adadad] text-center pb-4 leading-4">
          We never store your Aadhaar information, only your Aadhaar number will be saved in encrypted format. It will be used just once for identity verification. By continuing you agree to terms of usage and privacy policy of the platform.
        </Text>

        <TouchableOpacity
          className="bg-[#BBF389] rounded-full py-3"
          onPress={() => console.log("Verify pressed")}
        >
          <Text className="text-black text-center font-medium text-base">Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
