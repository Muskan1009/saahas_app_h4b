import { Tabs, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import '../../global.css';

export default function RootLayout() {
  
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <StatusBar hidden={true} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            alignItems: 'center',
            paddingBottom: 50,
            bottom: 0,
            left: 10,
            right: 10,
            height: 92,
            backgroundColor: '#2F2F2F',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            flexDirection: 'row',
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon label="home" icon="home-outline" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon label="Route" icon="location-outline" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="badge"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon label="Badge" icon="ribbon-outline" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="echo"
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <MaterialCommunityIcons name="robot-love-outline" size={24} color={focused ? '#8BE4AB' : '#FFFFFF'} />
                <Text className={`text-[10px] ${focused ? 'text-[#8BE4AB]' : 'text-white'}`}>Echo</Text>
              </View>
            ),
          }}
        />
      </Tabs>

      {/* Floating center button */}
      <TouchableOpacity
        onPress={() => router.push('/(no_tabs)/locationreport')}
        style={{
          position: 'absolute',
          bottom: 60,
          alignSelf: 'center',
          width: 64,
          height: 64,
          borderRadius: 32,
          elevation: 10,
          zIndex: 50,
          overflow: 'hidden', // important to round gradient corners
        }}
      >
        <LinearGradient
          colors={['#8BE4AB', '#16D2E6']} // violet gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 32,
          }}
        >
          <Ionicons name="arrow-up-circle-outline" size={28} color="black" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView >
  );
}

// Tab icon component
function TabIcon({ icon, label, focused }) {
  return (
    <View className="items-center justify-center">
      <Ionicons name={icon} size={22} color={focused ? '#8BE4AB' : '#FFFFFF'} />
      <Text className={`text-[10px] ${focused ? 'text-[#8BE4AB]' : 'text-white'}`}>{label}</Text>
    </View>
  );
}
