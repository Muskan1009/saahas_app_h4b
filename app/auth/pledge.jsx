import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function PledgeScreen() {
  const [selected, setSelected] = useState([]);

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
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Top Bar */}
      <View className="relative items-center justify-center mt-4 h-12">
        <TouchableOpacity className="absolute left-0 bg-[#EEEFFE] p-2 rounded-full" >
          <Ionicons name="arrow-back" size={20} color="#6757DB" />
        </TouchableOpacity>
        <Text className="text-lg font-medium">Pledge</Text>
      </View>

      {/* Step Progress */}
      <View className="flex-row justify-start items-center space-x-4 mt-6">
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
        <View className="w-[30%] h-1 bg-[#D9D9D9] rounded-full" />
        <View className="w-[30%] h-1 bg-[#6757DB] rounded-full" />
      </View>

      {/* Headings */}
      <View className="mt-12 mb-6">
        <Text className="text-center text-xl font-semibold mb-2">Your First Step of Saahas</Text>
        <Text className="text-center text-[#575757]">Make a small promise that can start real change.</Text>
      </View>

      {/* Pledge Cards */}
      {pledges.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => toggleSelect(item.id)}
          className={`flex-row items-start bg-[#EEEFFE] rounded-lg p-4 mb-4 ${
            selected.includes(item.id) ? 'border border-[#6757DB]' : ''
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
                selected.includes(item.id) ? 'border-[#6757DB] bg-[#6757DB]' : 'border-[#6757DB]'
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
            selected.length === 2 ? 'bg-[#6757DB]' : 'bg-[#EEEFFE]'
          }`}
        >
          <Text className="text-white text-center font-medium text-base">Let’s Begin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
