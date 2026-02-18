import HabitCard from '@/components/HabitCard'
import SwipeableItem from '@/components/SwipeableItem'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import pb from '@/lib/pocketbase'
import { HabitService } from '@/services/habit.service'
import { PocketBaseService } from '@/services/pocketbase.service'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

export default function index() {
  const authUser = pb.authStore.record

  const router = useRouter()

  async function handleLogout() {
    await PocketBaseService.signOut()
    router.replace('/(auth)')
  }

  const queryClient = useQueryClient()

  const {
    data: habits,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['habits'],
    queryFn: HabitService.fetchHabits,
  })

  const { mutate: deleteHabit } = useMutation({
    mutationKey: ['habit', 'delete'],
    mutationFn: HabitService.deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })

  const { mutate: completeHabit } = useMutation({
    mutationKey: ['habit', 'complete'],
    mutationFn: HabitService.completeHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })

  if (isLoading || isFetching) return <Text>Loading...</Text>

  if (isError) return <Text className="cursor-pointer">{error.message}</Text>

  return (
    <FlatList
      data={habits}
      refreshing={isFetching}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      showsVerticalScrollIndicator={true}
      ListEmptyComponent={() => (
        <HabitCard
          title="No habits found"
          description="Create a habit to get started"
          className="mx-4"
          onTouchEndCapture={() => router.navigate('/(protected)/add-habit')}
        />
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
        <SwipeableItem
          onDelete={() => deleteHabit(item.id)}
          onComplete={() => completeHabit(item.id)}
          className="mx-4"
        >
          <HabitCard {...item} />
        </SwipeableItem>
      )}
    />
  )
}
