// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { Feather, Ionicons } from '@expo/vector-icons';

// export default function Home() {
//   return (
//     <View className="flex-1 bg-">
//       {/* Header */}
//       <View className="flex-row justify-between items-center bg-violet-600 px-4 pb-4 pt-10">
//         <TouchableOpacity>
//           <Feather name="menu" size={24} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity className="bg-white p-2 rounded-full">
//           <Ionicons name="notifications-outline" size={20} color="#7C3AED" />
//         </TouchableOpacity>
//       </View>

//       {/* Main Content */}
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 pt-10">
//         <View className="items-center justify-center mt-10">
//           <Text className="text-gray-500 text-lg">Welcome to the Home Page! hello</Text>
//         </View>
//       </ScrollView>

//     </View>
//   );
// }

import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../../components/navbar'; // Adjust path as per your project

export default function Home() {
  return (
    <View className="flex-1 pt-7 bg-black">
      {/* Top Navbar */}
      <Navbar />

      <ScrollView className="flex-1 px-4">
        <View className="px-4">
        {/* Welcome Text */}
        <View className="mt-6">
          <Text className="text-[#FFFFFF] text-xl font-semibold text-center">Hey, where have you been?</Text>
          <Text className="text-[#FFFFFF] font-light text-base text-center mt-2 px-14">
            Let’s find the safer way forward, one step at a time.
          </Text>
        </View>

        {/* Start Journey Card */}
<View className="relative mt-10">
  {/* Girl Image floating above */}
  <Image
    source={require('../../assets/images/girl.png')}
    className="w-20 h-20 absolute -top-4 left-4 z-10"
    resizeMode="contain"
  />

  {/* Start Journey Card */}
  <View className="bg-gradient-to-r from-[#3D3D41] to-[#2D2D30] rounded-xl mt-6 z-0 border border-[#BBF389]/50">
    <View className="flex-row items-center justify-between p-5 py-6 pl-24">
      {/* Right side Text & Arrow */}
      <View className="ml-4 ">
        <Text className="text-white text-lg font-semibold">Start a journey</Text>
      </View>
      <Ionicons name="arrow-forward" size={24} color="#BBF389" />
    </View>

    <View className="bg-[#BBF389] py-2 px-5 rounded-b-xl">
      <Text className="text-[#000000] text-base p-4 text-center">
        Enter your destination and the app will guide you with the safest routes
      </Text>
    </View>
  </View>
</View>

        {/* Quick Actions */}
        <Text className="text-white font-semibold text-base mt-6 mb-3 flex justify-center">Quick actions</Text>

        <View className="flex-row justify-between h-60 gap-4" >
          {/* Unsafe Zone */}
          <TouchableOpacity className="h-52 w-[55%] bg-[#1a1a1a] rounded-md flex flex-col justify-between pb-2">
            <View className="h-full w-full overflow-hidden">
              <Image
                source={require('../../assets/images/map_placeholder.png')}
                className="rounded-t-xl"
                resizeMode="contain"
              />
            </View>
            <Text className="text-white text-center py-2 text-sm">Unsafe zone near me</Text>
          </TouchableOpacity>

          {/* Fake Call */}
          <View className="h-full gap-4 w-[45%] pr-4">
            <TouchableOpacity className="h-[47%] bg-[#BBF389] rounded-xl justify-center items-center">
              <Ionicons name="call" size={22} color="black" />
              <Text className="text-black text-sm mt-2 mb-3">Fake a call</Text>
            </TouchableOpacity>
            <TouchableOpacity className="h-[47%] bg-[#999999] rounded-xl justify-center items-center" >
              <Text className="text-black text-sm mt-2 mb-3">Blank Box</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Updates */}
        <Text className="text-[#FFFFFF] font-semibold text-base pt-8 flex justify-center pb-2">Weekly Updates</Text>

        <View className="rounded-xl overflow-hidden">
          <Image
            source={require('../../assets/images/youtube_thumb.png')} // Replace with actual thumbnail
            className="w-full h-48 aspect-video"
            resizeMode="contain"
          />
        </View>

        <View className="h-[50vh]">
          <Text>hello</Text>
        </View>
        </View>
      </ScrollView>
    </View>
  );
}
