import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, FontAwesome6, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { setItemAsync, getItemAsync } from 'expo-secure-store'

export default function Login() {

  const router = useRouter();

  const [userInput, setUserInput] = useState('');

  const [isLoading, setIsLoading] = useState(false)

  const [isError, setIsError] = useState('')

  const handleLogin = async () => {

    setIsLoading(true);
    setIsError();

    await fetch(`${process.env.EXPO_PUBLIC_API_URL}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput
      })
    }).then(res => res.json())
      .then(async (data) => {

        console.log(data)

        if (data.success) {

          setIsLoading(false);
          setIsError('');
          await setItemAsync('userID', data.data.userID);

          router.replace('/auth/otp')

        } else {
          setIsLoading(false);
          setIsError(data.message);
        }

      }).catch((error) => {
        setIsLoading(false);
        setIsError(error.message);
      })

  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black py-20 px-8"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Title */}
      <View className="items-center mb-10">
        <Text className="text-2xl font-semibold text-white">Login</Text>
        <Text className="text-white mt-2 text-sm text-center">
          Welcome Back! Complete your login
        </Text>
      </View>

      {/* Input Field */}
      <View className="space-y-4">
        <View className="w-full my-2 border border-gray-400 rounded-xl p-[1px]">
          <View className="flex-row items-center rounded-xl px-4 py-3">
            <Feather name="mail" size={18} color="#ccc" />
            <TextInput
              className="flex-1 text-base text-white ml-3"
              placeholder="Email or Phone"
              keyboardType="default"
              placeholderTextColor="#aaa"
              value={userInput}
              onChangeText={setUserInput}
            />
          </View>
        </View>
      </View>

      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-400">or</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Social Login */}
      <View className="flex-row justify-center gap-4">
        <TouchableOpacity className="border border-[#BBF389] rounded-md p-2 w-20 items-center">
          <FontAwesome name="google" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="border border-[#BBF389] rounded-md p-2 w-20 items-center">
          <FontAwesome name="facebook" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="border border-[#BBF389] rounded-md p-2 w-20 items-center">
          <FontAwesome6 name="x-twitter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {isError && (
        <View className="bg-red-500 rounded-lg p-4 mt-6">
          <Text className="text-white text-center">{isError}</Text>
        </View>
      )}

      {/* Login Button */}
      <View className="flex-1 justify-end mt-10">
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleLogin}
          className="bg-[#BBF389] rounded-3xl py-3 items-center"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text className="text-lg text-black">Login</Text>
          )}
        </TouchableOpacity>

        {/* Register Redirect */}
        <TouchableOpacity
          onPress={() => router.replace('/auth/register')}
          className="mt-4 border border-[#BBF389] rounded-3xl py-3"
        >
          <Text className="text-center text-lg text-white">New User? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}