import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import React from 'react'
import { View } from 'react-native'

export default function index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Button>
        <Text>Button</Text>
      </Button>
    </View>
  )
}
