import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function CameraScreen() {

    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const { crowdType, lighting, security } = useLocalSearchParams();

    if (!permission?.granted) {
        return (
            <View style={styles.centered}>
                <Text>Camera permission needed</Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePicture = async () => {
        if (!cameraRef.current) return;

        // 1. Get location permission and current position
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // 2. Take picture
        const photo = await cameraRef.current.takePictureAsync();
        const newPath = FileSystem.documentDirectory + `photo_${Date.now()}.jpg`;

        try {
            // 3. Move photo to a permanent location
            await FileSystem.moveAsync({
                from: photo.uri,
                to: newPath,
            });

            // 4. Navigate back with photo + location + existing form data
            router.replace({
                pathname: '/locationreport',
                params: {
                    photoUri: newPath,
                    crowdType,
                    lighting,
                    security,
                    latitude: latitude.toString(),     // ensure it's passed as a string
                    longitude: longitude.toString(),
                },
            });
        } catch (err) {
            console.error('❌ Failed to move photo or get location:', err);
        }

    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                facing={CameraType?.back}
            />
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <Text style={styles.captureText}>Snap</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    captureButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
    captureText: { fontSize: 18, color: 'black' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});