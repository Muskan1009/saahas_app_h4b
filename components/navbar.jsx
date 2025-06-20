
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar() {
    return (
        <View className="flex-row justify-between items-center px-4 pt-4 pb-2 bg-black">
            <TouchableOpacity>
                <View className="border-[#FFFFFF6E] border-[2px] w-12 h-12 rounded-full items-center justify-center">
                    <Ionicons name="menu" size={28} color="white" />
                </View>
            </TouchableOpacity>

            {/* Right-side Icon (Android character) */}
            <TouchableOpacity>
                {/* Placeholder - use your own image/icon if needed */}
                <View className="border-[#FFFFFF6E] border-[2px] w-12 h-12 rounded-full items-center justify-center">
                    <Ionicons name="notifications" size={28} color="#BBF389" />
                </View>
            </TouchableOpacity>
        </View>
    );
}
