import { EvilIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, SafeAreaView, TextInput, View } from 'react-native';
import MapView, { Circle, UrlTile } from 'react-native-maps';
import getCurrentLocation from './../../services/location';
import Navbar from '../../components/navbar';
import { getItemAsync } from 'expo-secure-store';


const MapScreen = () => {

  const [tileUrlTemplate, setTileUrlTemplate] = useState('');

  const [userLocation, setUserLocation] = useState({})

  const [searchQuery, setSearchQuery] = useState({
    from: { ...userLocation },
    to: {},
    isFromSet: false,
  });

  const [sampleHeatZones, setSampleHeatZones] = useState([
    { coordinates: { lat: 22.5351, lng: 88.3748 }, avgTrust: 22, count: 4, safetyLabel: "unsafe" },
    { coordinates: { lat: 22.5360, lng: 88.3765 }, avgTrust: 40, count: 6, safetyLabel: "moderately risky" },
    { coordinates: { lat: 22.5375, lng: 88.3730 }, avgTrust: 68, count: 3, safetyLabel: "safe" },
    { coordinates: { lat: 22.5338, lng: 88.3759 }, avgTrust: 55, count: 5, safetyLabel: "moderately risky" },
    { coordinates: { lat: 22.5382, lng: 88.3725 }, avgTrust: 80, count: 2, safetyLabel: "safe" },
    { coordinates: { lat: 22.5345, lng: 88.3740 }, avgTrust: 18, count: 7, safetyLabel: "unsafe" },
    { coordinates: { lat: 22.5390, lng: 88.3772 }, avgTrust: 48, count: 3, safetyLabel: "moderately risky" },
    { coordinates: { lat: 22.5367, lng: 88.3752 }, avgTrust: 72, count: 2, safetyLabel: "safe" },
    { coordinates: { lat: 22.5330, lng: 88.3761 }, avgTrust: 33, count: 4, safetyLabel: "unsafe" },
    { coordinates: { lat: 22.5379, lng: 88.3780 }, avgTrust: 66, count: 5, safetyLabel: "safe" },
    { coordinates: { lat: 22.5565, lng: 88.3979 }, avgTrust: 28, count: 5, safetyLabel: "unsafe" },
    { coordinates: { lat: 22.5572, lng: 88.3985 }, avgTrust: 45, count: 3, safetyLabel: "moderately risky" },
    { coordinates: { lat: 22.5558, lng: 88.3970 }, avgTrust: 62, count: 4, safetyLabel: "safe" },
    { coordinates: { lat: 22.5569, lng: 88.3992 }, avgTrust: 55, count: 2, safetyLabel: "moderately risky" },
    { coordinates: { lat: 22.5549, lng: 88.3968 }, avgTrust: 78, count: 3, safetyLabel: "safe" },
    { coordinates: { lat: 22.5578, lng: 88.3989 }, avgTrust: 19, count: 6, safetyLabel: "unsafe" },
    { coordinates: { lat: 22.5562, lng: 88.4001 }, avgTrust: 50, count: 5, safetyLabel: "moderately risky" },
    { coordinates: { lat: 22.5555, lng: 88.3977 }, avgTrust: 71, count: 2, safetyLabel: "safe" },
    { coordinates: { lat: 22.5584, lng: 88.3995 }, avgTrust: 35, count: 4, safetyLabel: "unsafe" },
    { coordinates: { lat: 22.5545, lng: 88.3960 }, avgTrust: 64, count: 3, safetyLabel: "safe" },
    { coordinates: { lat: 22.4906, lng: 88.3631 }, avgTrust: 30, count: 4, safetyLabel: "unsafe" },
    { coordinates: { lat: 22.4913, lng: 88.3640 }, avgTrust: 48, count: 5, safetyLabel: "moderately risky" },
    { coordinates: { lat: 22.4898, lng: 88.3625 }, avgTrust: 65, count: 3, safetyLabel: "safe" },
    { coordinates: { lat: 22.4909, lng: 88.3648 }, avgTrust: 55, count: 6, safetyLabel: "moderately risky" },
    { coordinates: { lat: 22.4889, lng: 88.3619 }, avgTrust: 77, count: 2, safetyLabel: "safe" },
    { coordinates: { lat: 22.4918, lng: 88.3652 }, avgTrust: 22, count: 7, safetyLabel: "unsafe" },
    { coordinates: { lat: 22.4904, lng: 88.3658 }, avgTrust: 52, count: 3, safetyLabel: "moderately risky" },
    { coordinates: { lat: 22.4895, lng: 88.3639 }, avgTrust: 69, count: 2, safetyLabel: "safe" },
    { coordinates: { lat: 22.4926, lng: 88.3661 }, avgTrust: 37, count: 4, safetyLabel: "unsafe" },
    { coordinates: { lat: 22.4885, lng: 88.3622 }, avgTrust: 63, count: 5, safetyLabel: "safe" }
  ]);

  const [heatMapData, setHeatMapData] = useState([])

  const getHeatMapData = async () => {

    const token = await getItemAsync('token');

    const { latitude, longitude } = await getCurrentLocation();

    fetch(`${process.env.EXPO_PUBLIC_API_URL}location-reports?lat=${latitude}&lng=${longitude}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': `Authorization ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHeatMapData([...data.data, ...sampleHeatZones]);
        } else {
          console.error('Error fetching heat map data:', data.message);
        }
      })

  }

  const getFillColor = (label) => {
    switch (label) {
      case 'unsafe':
        return 'rgba(255,0,0,0.4)';
      case 'moderately risky':
        return 'rgba(255,165,0,0.4)';
      case 'safe':
        return 'rgba(0,255,0,0.3)';
      default:
        return 'rgba(0,0,255,0.3)';
    }
  };

  const darkMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#212121' }] },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ color: '#757575' }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#1b1b1b' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{ color: '#2c2c2c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }],
    },
  ];

  useEffect(() => {

    const fetchTileUrl = async () => {

      try {

        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}aws/map/tiles/10/543/394`);
        const data = await res.json();

        const baseTile = data.url
          .replace(/10\/543\/394/, '{z}/{x}/{y}');

        setTileUrlTemplate(baseTile);

      } catch (error) {
        console.error('Error fetching tile URL:', error);
      }
    };

    fetchTileUrl();

  }, []);

  useEffect(() => {
    getHeatMapData();
  }, []);

  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      setUserLocation(loc);
    })();
  }, []);

  return (
    <View className="h-screen bg-black" behavior="padding">

      <Navbar />
      <View className="flex-col gap-4 p-4 bg-black">
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-1">
          <EvilIcons name="location" size={18} color="white" />
          <TextInput
            className="flex-1 text-base text-white"
            placeholder="From"
            placeholderTextColor="#888"
            keyboardType="default"
            onChangeText={(text) => {
              setSearchQuery({
                ...searchQuery,
                from: { ...userLocation, address: text },
                isFromSet: true,
              });
            }}
          />
        </View>
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-1">
          <EvilIcons name="location" size={18} color="white" />
          <TextInput
            className="flex-1 text-base text-white"
            placeholder="To"
            placeholderTextColor="#888"
            keyboardType="default"
          />
        </View>
      </View>

      {
        tileUrlTemplate ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              ...userLocation,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            customMapStyle={darkMapStyle}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            <UrlTile
              urlTemplate={tileUrlTemplate}
              maximumZ={18}
              flipY={false}
            />
            {heatMapData?.map((zone, index) => (
              <Circle
                key={index}
                center={{
                  latitude: zone.coordinates.lat,
                  longitude: zone.coordinates.lng,
                }}
                radius={100}
                fillColor={getFillColor(zone.safetyLabel)}
                strokeColor="transparent"
              />
            ))}
          </MapView>
        ) : (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        )
      }

    </View>
  )
}

export default MapScreen