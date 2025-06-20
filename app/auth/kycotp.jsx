
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function OtpScreen() {
  const [otp, setOtp] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Top Bar */}
      <View className="relative items-center justify-center mt-4 h-12">
        {/* Back Button */}
        <TouchableOpacity className="absolute left-0 bg-[#EEEFFE] p-2 rounded-full">
          <Ionicons name="arrow-back" size={20} color="#6757DB" />
        </TouchableOpacity>

        {/* Centered Title */}
        <Text className="text-lg font-medium">OTP</Text>
      </View>

      {/* Step Progress */}
      <View className="flex-row justify-start items-center space-x-4 mt-6">
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
        <View className="w-[30%] h-1 bg-[#6757DB] rounded-full" />
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
      </View>

      {/* Main Content */}
      <View className="pt-20">
        <Text className="text-center text-xl font-semibold mb-2">Enter your Verification OTP</Text>
        <Text className="text-center text-[#575757] mb-8">
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
        <Text className="text-xs text-[#575757] text-center pb-4 leading-4">
          We never store your Aadhaar information, only your Aadhaar number will be saved in encrypted format. It will be used just once for identity verification. By continuing you agree to terms of usage and privacy policy of the platform.
        </Text>

        <TouchableOpacity
          className="bg-[#6757DB] rounded-full py-3"
          onPress={() => console.log("Verify pressed")}
        >
          <Text className="text-white text-center font-medium text-base">Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
