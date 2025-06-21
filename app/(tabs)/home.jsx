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
              className="w-28 h-28 absolute -top-2 left-4 z-10"
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
<Text className="text-white font-semibold text-lg mt-8 mb-8 text-center">Quick actions</Text>

<View className="flex-row justify-between gap-3">
  {/* Map Card: Unsafe Zone */}
  <TouchableOpacity className="w-[58%] rounded-md border border-[#3C3C3C] bg-[#1a1a1a] overflow-hidden">
    <View className="w-full h-44 rounded-t-md overflow-hidden">
      <Image
        source={require('../../assets/images/map_placeholder.png')}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
    <Text className="text-white text-center text-sm py-3">Unsafe zone near me</Text>
  </TouchableOpacity>

  {/* Add Allies + SOS Stack */}
  <View className="w-[40%] justify-between">
    {/* Add Allies */}
    <TouchableOpacity className="bg-[#BBF389] rounded-md py-7 items-center justify-center">
      <Ionicons name="people-outline" size={22} color="black" />
      <Text className="text-black text-sm mt-2">Add Allies</Text>
    </TouchableOpacity>

    {/* Send SOS */}
    <TouchableOpacity className="bg-[#1a1a1a] border border-[#FF4D4D] rounded-md py-5 items-center justify-center ">
      <Ionicons name="alert-circle" size={24} color="#FF4D4D" />
      <Text className="text-[white] text-sm mt-2">Send SOS</Text>
    </TouchableOpacity>
  </View>
</View>


          {/* Weekly Updates */}
          <Text className="text-[#FFFFFF] font-semibold text-lg pt-10 text-center pb-8">Weekly Updates</Text>

          <View className="rounded-xl overflow-hidden pb-32">
            <Image
              source={require('../../assets/images/youtube_thumb.png')} // Replace with actual thumbnail
              className="w-full h-48 aspect-video"
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
