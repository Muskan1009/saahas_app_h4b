import { useNavigationContainerRef, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import '../global.css';
import { getItemAsync } from 'expo-secure-store'

export default function LoadingScreen() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const fetchSession = async () => {

    console.log(process.env.EXPO_PUBLIC_API_URL)

    setIsLoading(true);

    const token = await getItemAsync('token');

    await fetch(`${process.env.EXPO_PUBLIC_API_URL}users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': `Authorization ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {

        console.log(data)

        if (data.success) {
          setIsLoading(false);
          router.replace('/home');
        } else {
          setIsLoading(false);
          router.replace('/auth/login');
        }

      })

  }

  useEffect(() => {

    fetchSession();

  }, [])

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