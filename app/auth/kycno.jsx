import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function KycScreen() {
  const [aadhaar, setAadhaar] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Top Bar */}
      <View className="flex-row items-center pt-4 justify-between">
        <TouchableOpacity className="bg-[#EEEFFE] p-2 rounded-full">
          <Ionicons name="arrow-back" size={20} color="#6757DB" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-medium">KYC</Text>
        <View className="w-8" /> {/* Same width as back button to balance */}
      </View>

      {/* Step Progress */}
      <View className="flex-row justify-start items-center space-x-4 mt-6">
        <View className="w-[30%] h-1 bg-[#6757DB] rounded-full" />
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
      </View>

      {/* Main Content */}
      <View className="pt-20">
        <Text className="text-center text-xl font-semibold pb-2">Enter your Aadhaar Number</Text>
        <Text className="text-center text-[#575757] mb-8 text-sm">
          To maintain the authenticity of the platform we need to do a quick KYC.
        </Text>

        {/* Aadhaar Input */}
        <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2">
          <FontAwesome5 name="id-card" size={18} color="#9CA3AF" />
          <TextInput
            value={aadhaar}
            onChangeText={setAadhaar}
            placeholder="Enter Aadhaar Number"
            keyboardType="numeric"
            className="ml-3 flex-1 text-base text-black"
            maxLength={12}
          />
        </View>
      </View>

      {/* Bottom Note + Button */}
      <View className="flex-1 justify-end mb-6">
        <Text className="text-xs text-[#575757] text-center mb-4 leading-4">
          We never store your Aadhaar information only your Aadhaar number will be save in encrypted format it will be just use for one time identity verification. By continuing you agree terms of usage and privacy policy of the platform.
        </Text>

        <TouchableOpacity
          className="bg-[#6757DB] rounded-full py-3"
          onPress={() => console.log("Next pressed")}
        >
          <Text className="text-white text-center font-medium text-base">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

