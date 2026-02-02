import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import React from 'react'
import { View } from 'react-native'

export const options = { headerShown: false }

export default function index() {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-6">
      <Text>Create Account</Text>

      <Input
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        inputMode="email"
      />
      <Input placeholder="Password" secureTextEntry autoCapitalize="none" inputMode="none" />

      <Button className="w-full">
        <Text>Submit</Text>
      </Button>
    </View>
  )
}
