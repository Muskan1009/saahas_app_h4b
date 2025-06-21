import { EvilIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, SafeAreaView, TextInput, View } from 'react-native';
import MapView, { Circle, UrlTile } from 'react-native-maps';
import getCurrentLocation from './../../services/location';
import Navbar from '../../components/navbar';


const MapScreen = () => {

  const [tileUrlTemplate, setTileUrlTemplate] = useState('');

  const [userLocation, setUserLocation] = useState({})

  const [searchQuery, setSearchQuery] = useState({
    from: { ...userLocation },
    to: {},
    isFromSet: false,
  });

  const [sampleHeatZones, setSampleHeatZones] = useState([
    { coordinates: { lat: 28.6139, lng: 77.2090 }, avgTrust: 25, count: 5, safetyLabel: "unsafe" },
    { coordinates: { lat: 28.6150, lng: 77.2105 }, avgTrust: 35, count: 3, safetyLabel: "moderately risky" },
    { coordinates: { lat: 28.6175, lng: 77.2130 }, avgTrust: 70, count: 2, safetyLabel: "safe" },
    { coordinates: { lat: 28.6112, lng: 77.2071 }, avgTrust: 58, count: 4, safetyLabel: "moderately risky" },
    { coordinates: { lat: 28.6188, lng: 77.2145 }, avgTrust: 82, count: 3, safetyLabel: "safe" },
    { coordinates: { lat: 28.6105, lng: 77.2088 }, avgTrust: 20, count: 6, safetyLabel: "unsafe" },
    { coordinates: { lat: 28.6200, lng: 77.2160 }, avgTrust: 49, count: 2, safetyLabel: "moderately risky" },
    { coordinates: { lat: 28.6167, lng: 77.2122 }, avgTrust: 75, count: 1, safetyLabel: "safe" },
    { coordinates: { lat: 28.6120, lng: 77.2110 }, avgTrust: 30, count: 2, safetyLabel: "unsafe" },
    { coordinates: { lat: 28.6195, lng: 77.2152 }, avgTrust: 65, count: 5, safetyLabel: "safe" },
  ]);

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
            {sampleHeatZones.map((zone, index) => (
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