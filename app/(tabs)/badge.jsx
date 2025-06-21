import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../../components/navbar';
import { useRouter } from 'expo-router';


export default function BadgeScreen() {
  const router = useRouter();
  const pledgesCompleted = 5;
  const pledgesMax = 6;

  const reportsSubmitted = 8;
  const reportsMax = 10;


  const calculateTrustScore = () => {
    const reportPoints = (reportsSubmitted / reportsMax) * 70;
    const pledgePoints = (pledgesCompleted / pledgesMax) * 30;
    return Math.round(reportPoints + pledgePoints);
  };

  const trustScore = calculateTrustScore();

  const pledges = [
    { title: 'Commitment- Day 2 (Active)', status: 'Incomplete' },
    { title: 'Commitment- Day 1', status: 'Completed' },

  ];

  const getProgressBar = (value, max) => {
    const percentage = Math.min(value / max, 1) * 100;

    
    return (
      <View className="h-3 w-full bg-[#333] rounded-md overflow-hidden mt-1">
        <View
          className="h-full bg-[#BBF389] rounded-md"
          style={{ width: `${percentage}%` }}
        />
      </View>
    );
  };

  return (
    <View className="flex-1 pt-7 bg-black">
      <Navbar />

      <ScrollView className="px-6 mt-4">
        {/* Trust Score */}
        <View className="bg-[#1a1a1a] rounded-xl p-6 border border-[#BBF389]/40">
          <Text className="text-white text-xl font-semibold text-center mb-1">Your Trust Score</Text>
          <Text className="text-[#BBF389] text-3xl font-bold text-center mb-2">{trustScore} / 100</Text>
          <Text className="text-white text-center mb-4">
            Level: {trustScore >= 80 ? '💎 Trusted Ally' : trustScore >= 50 ? '⭐ Contributor' : '🔰 New Participant'}
          </Text>
          {getProgressBar(trustScore, 100)}
        </View>

        {/* Contributions */}
        <View className="mt-8">
          <Text className="text-white text-lg font-semibold text-center mb-4">Your Contributions</Text>

           {/* Reports Submitted */}
          <View className="mb-4">
            <View className="flex-row justify-between">
              <Text className="text-white text-sm">Reports Submitted</Text>
              <Text className="text-white text-sm">{reportsSubmitted} / {reportsMax}</Text>
            </View>
            {getProgressBar(reportsSubmitted, reportsMax)}
          </View>
          
          {/* Pledges Completed */}
          <View className="mb-4">
            <View className="flex-row justify-between">
              <Text className="text-white text-sm">Pledges Completed</Text>
              <Text className="text-white text-sm">{pledgesCompleted} / {pledgesMax}</Text>
            </View>
            {getProgressBar(pledgesCompleted, pledgesMax)}
          </View>

         
        </View>

        <View className="mt-8">
          <Text className="text-white text-lg font-semibold mb-6 text-center">Recent Pledges</Text>

          {pledges.map((pledge, idx) => (
            <View key={idx} className="bg-[#2D2D30] p-4 rounded-lg mb-3 border border-[#3C3C3C]">
              <Text className="text-white font-semibold mb-">{pledge.title}</Text>

              {pledge.status === 'Completed' ? (
                <View className="mt-2">
                  {/* Stars */}
                  <View className="flex-row items-center gap-1 mb-2">
                    <Ionicons name="star" size={14} color="#FFBA26" />
                    <Ionicons name="star" size={14} color="#FFBA26" />
                    <Ionicons name="star" size={14} color="#FFBA26" />
                  </View>
                  {/* Inactive Button */}
                  <View className="bg-gray-500 px-4 py-2 rounded-md self-start opacity-60">
                    <Text className="text-white text-sm">Completed</Text>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  className="mt-2 bg-[#BBF389] px-4 py-2 rounded-md self-start"
                  onPress={() => router.push('/auth/pledge')}
                >
                  <Text className="text-black text-sm">{pledge.status}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        {/* Badges Section */}
        <View className="mt-10">
          <Text className="text-white text-lg font-semibold text-center mb-4">Badges Earned</Text>
          <View className="flex-row flex-wrap justify-center gap-4">
            {[
              { icon: 'star', label: 'First Report' },
              { icon: 'chatbubbles', label: 'Reflection Streak' },
              { icon: 'shield-checkmark', label: 'Trusted Ally' },
              { icon: 'medal', label: 'Verified Spot' },
            ].map((badge, i) => (
              <View key={i} className="items-center w-1/3 bg-[#1a1a1a] rounded-lg py-4 border border-[#3C3C3C]">
                <Ionicons name={badge.icon} size={24} color="#BBF389" />
                <Text className="text-white text-sm mt-2 text-center">{badge.label}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
