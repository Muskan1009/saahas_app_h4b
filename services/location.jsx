import * as Location from 'expo-location';

const getCurrentLocation = async () => {
    // Ask for foreground location permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return null;
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
    });

    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    };
};

export default getCurrentLocation;