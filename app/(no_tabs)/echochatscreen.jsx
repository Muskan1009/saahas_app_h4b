import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EchoChatScreen() {
    const router = useRouter();

  const [messages, setMessages] = useState([
    { id: '1', sender: 'bot', text: 'Hi Muskan! How can I assist you today?' },
    { id: '2', sender: 'user', text: 'Tell me how to use Saahas app.' },
    { id: '3', sender: 'bot', text: 'Sure! You can start by marking unsafe locations and pledging your support.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: input },
    ]);
    setInput('');
    // Simulated bot reply after 1s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '_bot',
          sender: 'bot',
          text: 'Echo received your message!',
        },
      ]);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <View
      className={`my-2 px-4 py-3 rounded-xl max-w-[80%] ${
        item.sender === 'user'
          ? 'bg-[#BAF289] self-end'
          : 'bg-[#2D2D30] self-start'
      }`}
    >
      <Text
        className={`${
          item.sender === 'user' ? 'text-black' : 'text-white'
        } text-base`}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black pt-12 px-4"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-3xl font-semibold">✨ Echo Chat</Text>
        <TouchableOpacity  onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Chat messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16 }}
        className="flex-1"
        inverted
      />

      {/* Input area */}
      <View className="flex-row items-center px-4 py-3 bg-[#1c1c1c] rounded-full mb-6">
        <TextInput
          className="flex-1 text-white text-base px-2"
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleSend} className="p-2 bg-[#BAF289] rounded-full ml-2">
          <Ionicons name="send" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
