import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function MovieScreenDetail() {
  const router = useRouter()
  return (
    <View className="flex-1 items-center justify-center">
      <Text onPress={router.back}>MovieScreenDetail</Text>
    </View>
  )
}
