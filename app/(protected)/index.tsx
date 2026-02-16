import HabitCard from '@/components/HabitCard'
import SwipeableItem from '@/components/SwipeableItem'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import pb from '@/lib/pocketbase'
import { HabitService } from '@/services/habit.service'
import { PocketBaseService } from '@/services/pocketbase.service'
import { HabitRecord } from '@/types/pb-types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

export default function index() {
  const authUser = pb.authStore.record

  const router = useRouter()

  async function handleLogout() {
    await PocketBaseService.signOut()
    router.replace('/(auth)')
  }

  // TODO: use tanstack query
  const [habits, setHabits] = useState<HabitRecord[]>([])

  async function fetchHabits() {
    try {
      const habits = await HabitService.fetchHabits()
      setHabits(habits)
    } catch (error) {
      console.log('🪲🪲🪲🪲🪲')
      console.log(error)
      console.log('🪲🪲🪲🪲🪲')
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  return (
    <View className="w-full flex-1 flex-col gap-4">
      <FlatList
        data={habits}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <Text className="font-semibold">No habits yet</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListFooterComponent={() => <View className="h-24" />}
        keyExtractor={(_, index) => index.toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View className="flex flex-row items-baseline justify-between bg-white p-4 dark:bg-black">
            <Text className="text-2xl font-semibold capitalize">
              Hello, {authUser?.email.split('@')[0]}!
            </Text>

            <Button
              onPress={handleLogout}
              variant={'outline'}
              className="h-auto !border-red-500"
            >
              <MaterialIcons name="logout" size={16} color={colors.red[500]} />
              <Text className="text-xs text-red-500">Sign Out</Text>
            </Button>
          </View>
        )}
        renderItem={({ item }) => (
          <SwipeableItem onDelete={() => {}} className="mx-4">
            <HabitCard {...item} />
          </SwipeableItem>
        )}
      />
    </View>
  )
}
