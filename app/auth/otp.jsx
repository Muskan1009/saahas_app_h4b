import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

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

      <View className="flex-row justify-center space-x-3 my-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-10 h-12 border border-gray-400 rounded-md text-center text-lg text-black"
            keyboardType="number-pad"
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

      <TouchableOpacity
        className="mt-96 bg-[#BBF389] py-3 rounded-3xl"
        onPress={() => router.push('/home')} // or next screen
      >
        <Text className="text-black text-center font-semibold text-lg">Verify</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
