import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function PledgeScreen() {
  const [selected, setSelected] = useState([]);
  const router=useRouter();

  const pledges = [
    { id: 1, text: 'I pledge to mark at least one unsafe location this week.' },
    { id: 2, text: 'I pledge to speak up when I feel unsafe, even anonymously.' },
  ];

  // Toggle selection
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const onProceed = () => {
    if (selected.length === 2) {
      // both selected
      console.log('Proceeding...');
      // navigation or further logic
    } else {
      Alert.alert('Select Both Pledges', 'Please select both pledges to continue.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-6 py-10">
      {/* Top Bar */}
      <View className="flex-row items-center pt-4 justify-between">
              <TouchableOpacity
              onPress={() => router.push('/auth/welcome')}>
                <View className="border-[#FFFFFF6E] border-[2px] w-10 h-10 rounded-full items-center justify-center">
                  <Ionicons name="arrow-back" size={22} color="white" />
                </View>
              </TouchableOpacity>
              <Text className="ml-4 text-lg font-medium text-white">Pledge</Text>
              <View className="w-8" /> {/* Same width as back button to balance */}
            </View>

      {/* Step Progress */}
      <View className="flex-row justify-start items-center gap-4 mt-6">
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
        <View className="w-[30%] h-1 bg-[#BBF389] rounded-full" />
      </View>

      {/* Headings */}
      <View className="mt-12 mb-6">
        <Text className="text-center text-white text-xl font-semibold mb-2">Your First Step of Saahas</Text>
        <Text className="text-center text-white">Make a small promise that can start real change.</Text>
      </View>

      {/* Pledge Cards */}
      {pledges.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => toggleSelect(item.id)}
          className={`flex-row items-start bg-[#1f1f1f] rounded-lg p-4 mb-4 ${
            selected.includes(item.id) ? 'border border-[#BBF389]' : 'border border-[#5a5a5a]'
          }`}
        >
          {/* Number Box */}
          <View className="w-8 h-8 bg-white rounded-md items-center justify-center mt-1 mr-4">
            <Text className="text-sm font-bold">{item.id}</Text>
          </View>

          {/* Text and Checkbox */}
          <View className="flex-1 flex-row justify-between items-start">
            <Text className="text-sm text-[#575757] flex-1 pr-2">{item.text}</Text>
            <View
              className={`w-5 h-5 rounded-full border-2 mt-1 ${
                selected.includes(item.id) ? 'border-[#BBF389] bg-[#BBF389]' : 'border-[#BBF389]/30'
              }`}
            />
          </View>
        </TouchableOpacity>
      ))}

      {/* Continue Button */}
      <View className="flex-1 justify-end mb-6">
        <TouchableOpacity
          disabled={selected.length !== 2}
          onPress={onProceed}
          className={`rounded-full py-3 ${
            selected.length === 2 ? 'bg-[#BBF389]' : 'bg-[#272727]'
          }`}
        >
          <Text className="text-black text-center font-medium text-base">Let’s Begin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
