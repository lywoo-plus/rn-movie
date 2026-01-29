import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, View } from 'react-native'

export default function index() {
  const router = useRouter()

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="min-h-full pb-4"
      >
        <Image source={icons.logo} className="mx-auto mt-20 h-10 w-12" />

        <View className="mt-5 flex-1">
          <SearchBar
            placeholder="What are you looking for?"
            onPress={() => router.push('/search')}
          />
        </View>
      </ScrollView>
    </View>
  )
}
