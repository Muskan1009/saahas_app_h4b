import { Feather, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-black  px-8 py-20"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Title */}
            <View className="items-center mb-10">
                <Text className="text-2xl font-semibold text-white">Create Account</Text>
                <Text className="text-white mt-2 text-sm text-center">Register now </Text>
            </View>

            {/* Input Fields */}
            <View className="space-y-4">
                <View className="w-full my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/20">
          <View className="flex-row items-center rounded-xl px-4 py-3 backdrop-blur-md">
                    <MaterialIcons name="drive-file-rename-outline" size={18} color="#666" className="mr-2" />
                    <TextInput
                        className="flex-1 text-base text-black"
                        placeholder="Full Name"
                        placeholderTextColor="#888"
                        keyboardType="name"
                    />
                </View>
                </View>

               <View className="w-full my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/20">
          <View className="flex-row items-center rounded-xl px-4 py-3 backdrop-blur-md">
                    <Feather name="mail" size={18} color="#666" className="mr-2" />
                    <TextInput
                        className="flex-1 text-base text-black"
                        placeholder="Email"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                    />
                </View>
                </View>

                 <View className="w-full my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/20">
          <View className="flex-row items-center rounded-xl px-4 py-3 backdrop-blur-md">
                    <Feather name="phone" size={18} color="#666" className="mr-2" />
                    <TextInput
                        className="flex-1 text-base text-black"
                        placeholder="Phone Number"
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
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
             <View className="flex-1 justify-end">
            <TouchableOpacity className=" bg-[#BBF389] py-3 rounded-3xl">
                <Text className="text-black text-center text-lg">Register</Text>
            </TouchableOpacity>

            {/* Register Redirect */}
            <TouchableOpacity
                onPress={() => router.push('/auth/login')}
                className="mt-4 border border-[#BBF389] rounded-3xl py-3 "
            >
                <Text className="text-center text-white text-lg">Already have an account? Login</Text>
            </TouchableOpacity>
        </View>    

        </KeyboardAvoidingView>
    );
}
