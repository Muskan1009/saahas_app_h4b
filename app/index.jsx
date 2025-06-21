import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFetchUser } from '../hooks/useUser'; // Assuming this is correctly set up
import '../global.css';

export default function LoadingScreen() {

  const router = useRouter();

  const { data, isLoading, isError } = useFetchUser();

  // Redirect if user is already authenticated
  useEffect(() => {

    if (isLoading) return; // Wait for loading to finish

    if (data?.data?.isAuthenticated) {
      // User is authenticated, redirect to home
      router.replace('/home');
    } else {
      // User is not authenticated, redirect to login
      router.replace('/auth/login');
    }

  }, [data]);

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">

      <Image
        source={require('../assets/images/logo.png')}
        className="w-24 h-24 mb-6"
        resizeMode="contain"
      />

      <Text className="text-[#7DF6AD] text-4xl font-bold mb-2 tracking-wider">
        सAAहAS
      </Text>

      <Text className="text-white text-sm text-center mb-12 opacity-80">
        Because Bravery Isn’t Loud{'\n'}— It’s Action.
      </Text>

      {isLoading && (
        <ActivityIndicator color="#BBF389" size="large" />
      )}

    </View>
  );
}