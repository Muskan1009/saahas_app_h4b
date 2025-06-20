import { Tabs } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import '../../global.css';

export default function RootLayout() {
  
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          alignItems: 'center',
          paddingBottom: '30',
          bottom: 0,
          left: 10,
          right: 10,
          height: 90,
          backgroundColor: '#fff',
          borderRadius: 40,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          flexDirection: 'row',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Home" icon="home-outline" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="route"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Route" icon="location-outline" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-listings/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <CenterButton focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="pledge"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Pledge" icon="feather" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Profile" icon="person-outline" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

// Tab icon component
function TabIcon({ icon, label, focused }) {
  return (
    <View className="items-center justify-center">
      <Ionicons name={icon} size={22} color={focused ? '#7C3AED' : '#000'} />
      <Text className={`text-[10px] ${focused ? 'text-violet-600' : 'text-black'}`}>{label}</Text>
    </View>
  );
}

// Floating center button component
function CenterButton({ focused }) {
  return (
    <View className="items-center justify-center -mt-8 bg-white w-16 h-16 rounded-full border border-gray-200 shadow-md">
      <Ionicons name="arrow-up-circle-outline" size={26} color="#7C3AED" />
    </View>
  );
}