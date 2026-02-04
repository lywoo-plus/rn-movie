import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useCounterStore } from '@/stores/useCounterStore'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'

export default function index() {
  const { count, increment, decrement } = useCounterStore(
    useShallow((s) => ({
      count: s.count,
      increment: s.increment,
      decrement: s.decrement,
    }))
  )

  const router = useRouter()

  return (
    <View className="w-full flex-1 flex-col items-center justify-center gap-4">
      <Text className="bg-pink-500 px-4 uppercase">protected index</Text>
      <Text>Count: {count}</Text>

      <Button onPress={() => router.back()}>
        <Text>Back</Text>
      </Button>

      <Button onPress={increment}>
        <Text>Increment</Text>
      </Button>
      <Button onPress={decrement}>
        <Text>Decrement</Text>
      </Button>
    </View>
  )
}
