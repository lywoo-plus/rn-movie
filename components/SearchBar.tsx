import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

interface Props {
  placeholder: string
  value?: string
  onChangeText?: (text: string) => void
  onPress?: () => void
}

export default function SearchBar({ value, onChangeText, placeholder, onPress }: Props) {
  return (
    <View className="flex-row items-center rounded-full bg-dark-200 px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={'#ab8bff'}
      />

      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#a8b5db'}
        className="ml-2 flex-1 text-white"
      />
    </View>
  )
}
