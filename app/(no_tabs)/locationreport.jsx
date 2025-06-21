import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function LocationReport() {
  const [crowdType, setCrowdType] = useState('');
  const [lighting, setLighting] = useState('');
  const [security, setSecurity] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-6 pt-10 pb-20">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity className="rounded-full border border-[#FFFFFF6E] p-2">
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold ml-4 ">Report Location</Text>
          </View>

          {/* Title */}

          <Text className="text-white text-2xl font-bold mb-1">Report the location</Text>
          <Text className="text-gray-400 mb-6 text-sm">
            Report this location by filling a few details.{"\n"}Your current location will be auto-detected.
          </Text>



          {/* Dropdown 1: Crowd Type */}
          <View className="mb-4 px-2 my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/30">
            <Picker
              selectedValue={crowdType}
              onValueChange={(itemValue) => setCrowdType(itemValue)}
              dropdownIconColor="#C4C4C4"
              style={{ color: 'white' }}
            >
              <Picker.Item label="Select Crowd Type" value="" />
              <Picker.Item label="Sparse" value="sparse" />
              <Picker.Item label="Moderate" value="moderate" />
              <Picker.Item label="Dense" value="dense" />
            </Picker>
          </View>

          {/* Dropdown 2: Lighting Condition */}
          <View className="mb-4 px-2 my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/30">
            <Picker
              selectedValue={lighting}
              onValueChange={(itemValue) => setLighting(itemValue)}
              dropdownIconColor="#C4C4C4"
              style={{ color: 'white' }}
            >
              <Picker.Item label="Select Lighting Condition" value="" />
              <Picker.Item label="Well Lit" value="well_lit" />
              <Picker.Item label="Dim" value="dim" />
              <Picker.Item label="Dark" value="dark" />
            </Picker>
          </View>

          {/* Dropdown 3: Visible Security */}
          <View className="mb-4 px-2 my-2 border border-gray-400 rounded-xl p-[1px] bg-gradient-to-r from-white/10 to-[#999999]/30">
            <Picker
              selectedValue={security}
              onValueChange={(itemValue) => setSecurity(itemValue)}
              dropdownIconColor="#C4C4C4"
              style={{ color: 'white' }}
            >
              <Picker.Item label="Select Visible Security" value="" />
              <Picker.Item label="Police" value="police" />
              <Picker.Item label="Security Guard" value="guard" />
              <Picker.Item label="None" value="none" />
            </Picker>
          </View>

          {/* Photo Upload Prompt */}
          <TouchableOpacity className="mt-2 p-6 border border-gray-400 rounded-xl bg-gradient-to-r from-white/10 to-[#999999]/30 items-center">
            <Ionicons name="camera-outline" size={32} color="#A0A0A0" />
            <Text className="text-gray-300 text-center mt-2">
              Capture a photo of the surrounding you{"\n"}want to report.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Button fixed at bottom */}
      <View className="absolute bottom-4 left-6 right-6">
        <TouchableOpacity className="bg-lime-400 py-3 rounded-full items-center">
          <Text className="text-black font-semibold text-base">Upload Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
