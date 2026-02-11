import { Switch } from '@/components/ui/switch'
import { Text } from '@/components/ui/text'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { View } from 'react-native'

export default function setting() {
  const { colorScheme, setColorScheme } = useColorScheme()

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row items-center gap-2">
        <Switch
          id="theme"
          nativeID="theme"
          checked={colorScheme === 'dark'}
          onCheckedChange={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
        />
        <Text className="text-center capitalize text-black dark:text-white">
          {colorScheme}
        </Text>
      </View>
    </View>
  )
}
