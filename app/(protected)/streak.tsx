import HabitCard from '@/components/HabitCard'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { HabitService } from '@/services/habit.service'
import { HabitRecord } from '@/types/pb-types'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { View } from 'react-native'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

export default function index() {
  const { data: topStreakHabits } = useQuery({
    queryKey: ['top-streak-habits'],
    queryFn: HabitService.fetchTopStreakHabits,
  })

  const {
    data: completedHabits,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['completed-habits'],
    queryFn: HabitService.fetchCompletedHabits,
  })

  if (isError) return <Text className="cursor-pointer">{error.message}</Text>

  return (
    <View className="w-full flex-1 flex-col gap-4">
      <FlatList
        data={completedHabits}
        refreshing={isFetching}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        showsVerticalScrollIndicator={true}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListFooterComponent={() => <View className="h-24" />}
        keyExtractor={(_, index) => index.toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View className="flex gap-4 bg-white p-4">
            <Text className="text-2xl font-semibold capitalize">Habit Streaks</Text>
            <TopStreakCard data={topStreakHabits?.items || []} />
          </View>
        )}
        renderItem={({ item }) => <HabitCard {...item} className="mx-4" />}
      />
    </View>
  )
}

function TopStreakCard({ data }: { data: HabitRecord[] }) {
  return (
    <Card className="p-4">
      <CardHeader className="p-2">
        <CardTitle>
          <View className="flex flex-row items-center gap-2">
            <View>
              <AntDesign name="trophy" size={24} color={colors.yellow[600]} />
            </View>
            <Text className="font-semibold">Top Streaks</Text>
          </View>
        </CardTitle>
        <CardDescription className="text-gray-600">
          {data.map((item, index) => (
            <View
              key={item.id}
              className="flex w-full flex-row items-center gap-4 border-b border-gray-200 p-2"
            >
              <View
                className={cn(
                  'flex size-8 items-center justify-center rounded-full',
                  `bg-yellow-${data.length - index + 1}00`
                )}
              >
                <Text className="font-semibold text-black">{index + 1}</Text>
              </View>
              <Text className="flex-1 text-sm font-semibold">{item.title}</Text>
              <Text className="text-sm font-semibold">{item.streak_count}</Text>
            </View>
          ))}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
