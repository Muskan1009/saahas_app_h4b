import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EchoScreen() {
    
    const router = useRouter();
    return (

        <View className="flex-1 bg-black px-5 pt-12 relative">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-3xl font-semibold">✨ Echo</Text>
                <View className="flex-row gap-2">
                    <TouchableOpacity className="border-[#FFFFFF6E] border-[2px] w-12 h-12 rounded-full items-center justify-center bg-gradient-to-r from-[#3D3D41] to-[#2D2D30]">
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="border-[#FFFFFF6E] border-[2px] w-12 h-12 rounded-full items-center justify-center bg-gradient-to-r from-[#3D3D41] to-[#2D2D30]">
                        <Entypo name="cross" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Welcome Text */}
            <View className="pt-8 pb-10 gap-2">
                <Text className="text-[#FFFFFF] text-3xl font-semibold text-center">Hello, Muskan</Text>
                <Text className="text-[#FFFFFF] text-center text-xl">Hlw can I assist you right now?</Text>
            </View>

            {/* Echo Tiles */}
            <View className="flex-row flex-wrap pt-5 justify-between pb-12">
                {/* Talk with Echo */}
                <TouchableOpacity className="bg-[#76EFA4] w-[48%] h-60 rounded-bl-3xl rounded-lg px-4 py-6 gap-6">
                    <View className="p-2 w-11 rounded-full bg-[#72E29F]">
                        <Ionicons name="mic-outline" size={24} color="black" />
                    </View>
                    <Text className="text-black font-semibold text-2xl w-16">Talk with Echo</Text>
                </TouchableOpacity>

                {/* Right two buttons stacked */}
                <View className="w-[48%] justify-between gap-4">
                    {/* Chat with Echo */}
                    <TouchableOpacity className="bg-[#BAF289] p-5 h-28 rounded-xl gap-1" onPress={() => router.push('/echochatscreen')}>
                        <View className="bg-[#ADE37D] p-2 w-11 rounded-full">
                            <Ionicons name="send" size={24} color="black" />
                        </View>
                        <Text className="text-[#575757] font-medium">Chat with Echo</Text>
                    </TouchableOpacity>

                    {/* Share image */}
                    <TouchableOpacity className="bg-[#E3E8FF] h-28 rounded-xl p-5 gap-1">
                        <View className="bg-[#D3D9ED] p-2 w-11 rounded-full">
                            <MaterialCommunityIcons name="image-plus" size={24} color="black" />
                        </View>
                        <Text className="text-black font-medium">Share image</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Recent Search */}
            <Text className="text-white text-2xl font-semibold pb-5 text-center ">Recent Search</Text>
            <View className="gap-4 mb-16">
                <TouchableOpacity className="bg-[#1c1c1c] border border-[#BBF389] rounded-xl px-4 py-3 flex-row items-center gap-3">
                    <Ionicons name="search-outline" size={24} color="#BBF389" />
                    <Text className="text-white">Steps to use saahas...</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-[#1c1c1c] border border-[#BBF389] rounded-xl px-4 py-3 flex-row items-center gap-3">
                    <Ionicons name="search-outline" size={24} color="#BBF389" />
                    <Text className="text-white">How can I detect dark area?...</Text>
                </TouchableOpacity>
            </View>

            {/* Floating Center Arrow Button */}
            <TouchableOpacity
                className="absolute bottom-8 left-1/2 -ml-7 w-14 h-14 bg-[#69e19e] rounded-full justify-center items-center z-10"
                onPress={() => {
                    console.log('Floating arrow pressed');
                }}
            >
                <Ionicons name="arrow-up" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}
