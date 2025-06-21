import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getItemAsync } from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import handleUploadFile from '../../libs/handleUploadFile';

const screenWidth = Dimensions.get('window').width;

export default function LocationReport() {

  const params = useLocalSearchParams();

  const [crowdType, setCrowdType] = useState(params.crowdType || '');
  const [lighting, setLighting] = useState(params.lighting || '');
  const [security, setSecurity] = useState(params.security || '');
  const [imageUri, setImageUri] = useState(null);

  const { photoUri, latitude, longitude, isFeedback } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);

  const handleLocationReport = async () => {

    const token = await getItemAsync('token');

    if (!photoUri) {
      setError('Please capture a photo before submitting the report.');
      return;
    }

    setIsLoading(true);

    const uploadedImageUrl = await handleUploadFile({
      uri: photoUri,
      name: `report_${Date.now()}.jpg`,
      type: 'image/jpeg',
    });

    console.log(uploadedImageUrl)

    if (!uploadedImageUrl) {
      setError('Failed to upload the photo. Please try again.');
      setIsLoading(false);
      return;
    }

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}location-reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': `Authorization ${token}`,
      },
      body: JSON.stringify({
        imgUrl: uploadedImageUrl,
        coordinates: [
          parseFloat(longitude),
          parseFloat(latitude)
        ],
        parameters: {
          crowdType: crowdType,
          lightingCondition: lighting,
          visibleSecurity: security
        },
        isFeedbackProvided: isFeedback || false,
        feedbackFor: null, // Assuming no feedback for now
        feedback: null, // Assuming no feedback for now
      })
    })

    const data = await response.json();

    if (data.success) {

      alert('Location report submitted successfully!');
      setIsLoading(false);

      console.log('Location report submitted successfully:', data);
      // reset form state
      setCrowdType('');
      setLighting('');
      setSecurity('');
      setImageUri(null);

    } else {
      setError(data.message || 'Failed to submit the report. Please try again.');
      setIsLoading(false);
    }

  }

  useEffect(() => {
    if (photoUri) {
      FileSystem.getInfoAsync(photoUri).then(info => {
        console.log('File exists?', info.exists, 'URI:', info.uri);
      });
    }
  }, [photoUri]);

  // ['good', 'moderate', 'poor']

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-6 py-14">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Top Bar */}
          <View className="flex-row items-center pb-4 justify-between">
            <TouchableOpacity onPress={() => router.push('/home')}>
              <View className="border-[#FFFFFF6E] border-[2px] w-10 h-10 rounded-full items-center justify-center">
                <Ionicons name="arrow-back" size={22} color="white" />
              </View>
            </TouchableOpacity>
            <Text className="ml-4 text-lg font-medium text-white"></Text>
            <View className="w-8" />
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
              <Picker.Item label="Good" value="good" />
              <Picker.Item label="Sketchy" value="sketchy" />
              <Picker.Item label="Risky" value="risky" />
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
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
          </View>

          {/* Capture Button Updated */}
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/camera',
                params: { crowdType, lighting, security },
              })
            }
            className="mt-2 mb-5 p-6 border border-gray-400 rounded-xl bg-gradient-to-r from-white/10 to-[#999999]/30 items-center"
          >
            <Ionicons name="camera-outline" size={32} color="#A0A0A0" />
            <Text className="text-gray-300 text-center mt-2">
              {photoUri
                ? 'Photo captured ✅ — Tap to retake'
                : 'Capture a photo of the surrounding you\nwant to report.'}
            </Text>
          </TouchableOpacity>

          {/* Show Captured Image (Optional Preview) */}
          {
            photoUri && (
              <View className="mb-6">
                <Text className="text-white text-lg font-semibold mb-2">Captured Photo:</Text>
                <Image
                  source={{ uri: photoUri }}
                  style={{
                    height: 220,
                    borderRadius: 12,
                    backgroundColor: '#444',
                  }}
                  resizeMode="cover"
                />
              </View>
            )
          }

        </ScrollView>

        {/* Button fixed at bottom */}
        <View className="absolute bottom-4 left-6 right-6">

          <TouchableOpacity
            className="bg-lime-400 py-3 rounded-full items-center"
            onPress={handleLocationReport}
            disabled={isLoading}
          >
            <Text className="text-black font-semibold text-base">
              {isLoading ? 'Uploading...' : 'Upload Report'}
            </Text>
          </TouchableOpacity>

          {error && (
            <Text className="text-red-400 text-center mt-2">{error}</Text>
          )}

        </View>

      </View>

    </SafeAreaView>
  );
}
