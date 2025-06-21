import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


export default function AlliesScreen() {
    const router = useRouter();

    const [allies, setAllies] = useState([
        { name: 'Mom', phone: '+91 9876543210' },
        { name: 'Roommate', phone: '+91 9123456789' },
    ]);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const addAlly = () => {
        if (!name || !phone) {
            Alert.alert('Missing Fields', 'Please fill both name and phone.');
            return;
        }
        setAllies([...allies, { name, phone }]);
        setName('');
        setPhone('');
    };

    const sendSOS = () => {
        // You can integrate SMS or push notification later here
        Alert.alert("SOS Sent", "Emergency alert sent to all trusted allies and nearest authorities.");
    };

    return (
        <View className="flex-1 bg-black px-6 pt-12 pb-20">
            <View className="flex-row items-center mb-4">
                <TouchableOpacity className="rounded-full border border-[#FFFFFF6E] p-2" onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-semibold ml-4">Home</Text>
            </View>

            {/* Title */}
            <Text className="text-white text-2xl font-bold text-center mb-2">Add Allies</Text>
            <Text className="text-gray-400 text-sm text-center mb-6">
                Add people you trust. They’ll be alerted in an emergency.
            </Text>

            {/* Add Ally Form */}
            <View className="mb-6">
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#888"
                    className="bg-gradient-to-r from-white/10 to-[#999999]/20 text-white rounded-lg px-4 py-3 mb-3 border-[1px] border-white"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="#888"
                    keyboardType="phone-pad"
                    className="bg-gradient-to-r from-white/10 to-[#999999]/20 text-white rounded-lg px-4 py-3 border-[1px] border-white"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TouchableOpacity onPress={addAlly} className="bg-[#BBF389] mt-4 py-3 rounded-full items-center">
                    <Text className="text-black font-semibold">Add Ally</Text>
                </TouchableOpacity>
            </View>

            {/* Trusted Allies List */}
            <ScrollView className="mb-6">
                <Text className="text-white text-lg font-semibold mb-2">Your Allies</Text>

                {allies.map((ally, idx) => (
                    <View
                        key={idx}
                        className="flex-row items-center justify-between bg-[#1C1C1E] p-4 rounded-lg mb-2"
                    >
                        <View>
                            <Text className="text-white">{ally.name}</Text>
                            <Text className="text-gray-400">{ally.phone}</Text>
                        </View>

                        {/* Call Button */}
                        <TouchableOpacity
                            onPress={() => router.push({
                                pathname: '/incomingcall',
                                params: { name: ally.name, phone: ally.phone }
                            })}
                            className="bg-lime-400 p-2 rounded-full ml-4"
                        >
                            <Ionicons name="call" size={20} color="black" />
                        </TouchableOpacity>

                    </View>
                ))}
            </ScrollView>


            {/* Nearest Local Authorities */}
            <View className="mb-6">
                <Text className="text-white text-lg font-semibold mb-2">Local Authorities</Text>
                <View className="bg-[#1C1C1E] p-4 rounded-lg">
                    <Text className="text-white mb-1">Local Police Station</Text>
                    <Text className="text-gray-400">+91 100</Text>
                    <Text className="text-white mt-2">Women Helpline</Text>
                    <Text className="text-gray-400">+91 1091</Text>
                </View>
            </View>

            {/* SOS Button Fixed at Bottom */}
            <View className="absolute bottom-4 left-6 right-6">
                <TouchableOpacity onPress={sendSOS} className="bg-red-600 py-3 rounded-full items-center">
                    <Text className="text-white font-semibold text-base">Send SOS Alert</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
