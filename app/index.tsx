import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-primary text-3xl font-bold">Hello</Text>

      <Link href="/onboarding">onboarding</Link>
      <Link href="/onboarding/123">onboarding 1</Link>
    </View>
  );
}
