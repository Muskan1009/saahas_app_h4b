import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect, useState } from 'react';

const { width } = Dimensions.get('window');

export default function Welcome() {
    const router = useRouter();
    const scrollRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = 3;
    const slideWidth = 200 + 16;

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % totalSlides;
            scrollRef.current?.scrollTo({ x: nextIndex * slideWidth, animated: true });
            setCurrentIndex(nextIndex);
        }, 2500); 

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-black py-20"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Heading and Description */}
            <View className="items-center mb-8 px-8">
                <Text className="text-2xl font-semibold text-white text-center">
                    Welcome to <Text className="text-[#BBF389] font-bold">Saahas</Text>
                </Text>
                <Text className="text-center text-white mt-3 leading-relaxed text-sm mb-10">
                    Join a community that's mapping unsafe areas, taking pledges for safer streets, and standing up — together. You stay anonymous, but your impact is real.
                </Text>
            </View>

            {/* Tilted Auto-Scrolling Carousel */}
            <ScrollView
                horizontal
                ref={scrollRef}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                className="pt-6"
                contentContainerStyle={{ gap: 16, paddingHorizontal: 5 }}
            >
                {[1, 2, 3].map((_, index) => (
                    <View
                        key={index}
                        className="rounded-xl overflow-hidden bg-gray-100 justify-center items-center"
                        style={{
                            width: 200,
                            height: 280,
                            transform: [
                                { rotate: index === 0 ? '-8deg' : index === 2 ? '8deg' : '0deg' },
                            ],
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                    >
                        <Text className="text-gray-400">Image {index + 1}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* CTA Button */}
            <View className="px-8 flex-1 justify-end">
                <TouchableOpacity
                    onPress={() => router.push('/auth/kycno')}
                    className="bg-[#BBF389] py-3 rounded-3xl px-8"
                >
                    <Text className="text-black text-center font-medium text-base">Let’s begin with KYC</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
