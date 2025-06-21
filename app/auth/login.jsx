import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, FontAwesome6, Feather } from '@expo/vector-icons';

export default function Login() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black py-20 px-8"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Title */}
      <View className="items-center mb-10">
        <Text className="text-2xl font-semibold text-white">Login</Text>
        <Text className="text-white mt-2 text-sm text-center">Welcome Back! complete your login</Text>
      </View>

      {/* Input Fields */}
      <View className="space-y-4">
        <View className="w-full my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/20">
          <View className="flex-row items-center rounded-xl px-4 py-3 backdrop-blur-md">
            <Feather name="mail" size={18} color="#ccc" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-white"
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

         <View className="w-full my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/20">
          <View className="flex-row items-center rounded-xl px-4 py-3 backdrop-blur-md">
            <Feather name="phone" size={18} color="#ccc" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-white"
              placeholder="Phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#aaa"
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

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => router.push('/auth/otp')}
        className="mt-60 bg-[#BBF389] rounded-3xl py-3"
      >
        <Text className="text-center text-lg text-black">Login</Text>
      </TouchableOpacity>

      {/* Register Redirect */}
      <TouchableOpacity
        onPress={() => router.push('/auth/register')}
        className="mt-4 border border-[#BBF389] rounded-3xl py-3"
      >
        <Text className="text-center text-lg text-white">New User ? Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
