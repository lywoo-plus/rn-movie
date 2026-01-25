import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>OnboardingId {id}</Text>
    </View>
  );
}
