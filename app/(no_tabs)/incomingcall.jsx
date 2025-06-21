import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Vibration, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

export default function IncomingCall() {
    const { name, phone } = useLocalSearchParams();
    const bounce = useSharedValue(1);
    const [sound, setSound] = useState(null);
    const [callActive, setCallActive] = useState(false);
    const [callTime, setCallTime] = useState(0);

    // Load ringtone
    async function playRingtone() {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/ringtone.mp3'), // Add your custom ringtone here
            { shouldPlay: true, isLooping: true }
        );
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        const pattern = [800, 300, 800, 300, 800];
        Vibration.vibrate(pattern, true); // 'true' to loop
        playRingtone();

        bounce.value = withRepeat(
            withSequence(withTiming(1.1, { duration: 300 }), withTiming(1, { duration: 300 })),
            -1,
            true
        );

        return () => {
            Vibration.cancel();
            if (sound) {
                sound.stopAsync();
                sound.unloadAsync();
            }
        };
    }, []);


    // Call timer when active
    useEffect(() => {
        let interval;
        if (callActive) {
            interval = setInterval(() => setCallTime(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [callActive]);

    const animatedAccept = useAnimatedStyle(() => ({
        transform: [{ scale: bounce.value }],
    }));

    const animatedReject = useAnimatedStyle(() => ({
        transform: [{ scale: bounce.value }],
    }));

    const handleReject = async () => {
        Vibration.cancel();
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
        }
        router.back(); // or router.replace('/')
    };


    const handleAccept = () => {
        Vibration.cancel();
        sound?.stopAsync();
        setCallActive(true);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <View className="flex-1 bg-black justify-center items-center">
            {/* Blurred Background */}
            <BlurView intensity={80} tint="dark" className="absolute inset-0" />

            <Ionicons name="person-circle" size={120} color="white" />

            <Text className="text-white text-3xl font-semibold mt-4">{name || 'Unknown Caller'}</Text>
            <Text className="text-gray-400 text-base mt-1">{phone || 'Private Number'}</Text>

            {!callActive ? (
                <>
                    <Text className="text-green-400 text-xl mt-4">📞 Incoming Call</Text>
                    <View className="flex-row mt-16 gap-16">
                        <Animated.View style={animatedReject}>
                            <TouchableOpacity
                                onPress={handleReject}
                                className="w-20 h-20 rounded-full bg-red-600 justify-center items-center shadow-lg"
                            >
                                <Ionicons name="close" size={28} color="white" />
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={animatedAccept}>
                            <TouchableOpacity
                                onPress={handleAccept}
                                className="w-20 h-20 rounded-full bg-green-500 justify-center items-center shadow-lg"
                            >
                                <Ionicons name="call" size={28} color="white" />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </>
            ) : (
                <>
                    <Text className="text-lime-300 text-xl mt-6">🟢 Call Active</Text>
                    <Text className="text-white text-xl mt-2">{formatTime(callTime)}</Text>

                    <TouchableOpacity
                        onPress={handleReject}
                        className="bg-red-600 px-8 py-3 rounded-full mt-10"
                    >
                        <Text className="text-white text-base font-semibold">End Call</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
