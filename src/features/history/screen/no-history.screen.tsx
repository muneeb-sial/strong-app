import { View, Text } from 'react-native';
import React from 'react';

export default function NoHistoryScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <View className="bg-gray-100 rounded-full p-8 mb-4">
        {/* You can place an icon here later */}
        <Text className="text-4xl">💪</Text>
      </View>
      
      <Text className="text-xl font-bold text-gray-900 mb-2">
        No Workout History Found
      </Text>
      
      <Text className="text-base text-gray-500 text-center">
        Start your first workout to see it here.
      </Text>
    </View>
  );
}