import { Feather, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { setItemAsync } from 'expo-secure-store';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {

    const router = useRouter();

    const [data, setData] = useState({ fullName: '', email: '', phoneNo: '' });

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const handleRegister = async () => {

        setIsLoading(true);
        setIsError('');

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setIsLoading(false);
                setIsError('');
                await setItemAsync('userID', result.data.userID);
                router.push('/auth/otp');
            } else {
                setIsLoading(false);
                setIsError(result.message);
            }
        } catch (error) {
            setIsLoading(false);
            setIsError(error.message);
        }
    }

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
                            className="flex-1 text-base text-white"
                            placeholder="Full Name"
                            placeholderTextColor="#888"
                            keyboardType="name"
                            onChangeText={(text) => setData({ ...data, fullName: text })}
                            value={data.fullName}
                        />
                    </View>
                </View>

                <View className="w-full my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/20">
                    <View className="flex-row items-center rounded-xl px-4 py-3 backdrop-blur-md">
                        <Feather name="mail" size={18} color="#666" className="mr-2" />
                        <TextInput
                            className="flex-1 text-base text-white"
                            placeholder="Email"
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            onChangeText={(text) => setData({ ...data, email: text })}
                            value={data.email}
                        />
                    </View>
                </View>

                <View className="w-full my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/20">
                    <View className="flex-row items-center rounded-xl px-4 py-3 backdrop-blur-md">
                        <Feather name="phone" size={18} color="#666" className="mr-2" />
                        <TextInput
                            className="flex-1 text-base text-white"
                            placeholder="Phone Number"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                            onChangeText={(text) => setData({ ...data, phoneNo: text })}
                            value={data.phoneNo}
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

            {/* Button */}
            <View className="flex-1 justify-end">

                <TouchableOpacity className=" bg-[#BBF389] py-3 rounded-3xl" disabled={isLoading}
                    onPress={handleRegister}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="black" />
                    ) : (
                        <Text className="text-lg text-black text-center">Register</Text>
                    )}
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
