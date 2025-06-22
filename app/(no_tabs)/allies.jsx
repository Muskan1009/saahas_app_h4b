import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getItemAsync } from 'expo-secure-store';


export default function AlliesScreen() {

    const router = useRouter();

    const [allies, setAllies] = useState([]);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const fetchAllies = async () => {

        const token = await getItemAsync('token');

        fetch(`${process.env.EXPO_PUBLIC_API_URL}users/ally`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': `Authorization ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setAllies(data.data);
                    console.log(data.data);
                } else {
                    Alert.alert('Error', 'Failed to fetch allies. Please try again.');
                }
            })
            .catch(err => {
                console.error(err);
                Alert.alert('Error', 'An error occurred while fetching allies.');
            });

    };

    const addAlly = async () => {

        const token = await getItemAsync('token');

        if (!name || !phone) {
            Alert.alert('Missing Fields', 'Please fill both name and phone.');
            return;
        }
        setName('');
        setPhone('');

        fetch(`${process.env.EXPO_PUBLIC_API_URL}users/ally`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `Authorization ${token}`,
            },
            body: JSON.stringify({ phoneNo: phone, name }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    fetchAllies(); // Refresh allies list
                    Alert.alert('Success', 'Ally added successfully!');
                } else {
                    Alert.alert('Error', 'Failed to add ally. Please try again.');
                }
            })

    };

    const sendSOS = async () => {

        console.log('allies', allies);

    }

    useEffect(() => {
        fetchAllies();
    }, [])

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

                {allies?.map((ally) => {
                    console.log(ally);
                    return (
                        <View
                            key={ally._id}
                            className="flex-row items-center justify-between bg-[#1C1C1E] p-4 rounded-lg mb-2"
                        >
                            <View>
                                <Text className="text-white">{ally?.allyName}</Text>
                                <Text className="text-gray-400">{ally?.allyContact}</Text>
                            </View>

                            {/* Call Button */}
                            <TouchableOpacity
                                onPress={() => router.push({
                                    pathname: '/incomingcall',
                                    params: { name: ally?.allyName, phone: ally?.allyContact }
                                })}
                                className="bg-lime-400 p-2 rounded-full ml-4"
                            >
                                <Ionicons name="call" size={20} color="black" />
                            </TouchableOpacity>

                        </View>
                    )
                })}

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
