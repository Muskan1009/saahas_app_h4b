import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import '../global.css'

export default function LoadingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      {/* Logo */}
      <Image
        source={require('../assets/images/logo.png')} // Replace with your logo path
        className="w-24 h-24 mb-6"
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-[#7DF6AD] text-4xl font-bold mb-2 tracking-wider">
        सAAहAS
      </Text>

      {/* Subtitle */}
      <Text className="text-white text-sm text-center mb-12 opacity-80">
        Because Bravery Isn’t Loud{'\n'}— It’s Action.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        onPress={() => router.push('/auth/login')} // Navigate to login or onboarding
        className="border border-[#BBF389] rounded-full px-10 py-3 mt-20"
      >
        <Text className="text-white text-base font-semibold">Get started</Text>
      </TouchableOpacity>
    </View>
  );
}