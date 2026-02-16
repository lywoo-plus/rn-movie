import SwipeableItem from '@/components/SwipeableItem'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import AntDesign from '@expo/vector-icons/AntDesign'
import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

export default function index() {
  return (
    <View className="w-full flex-1 flex-col gap-4">
      <FlatList
        data={Array(3).fill('')}
        showsVerticalScrollIndicator={true}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListFooterComponent={() => <View className="h-4" />}
        keyExtractor={(_, index) => index.toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View className="flex gap-4 bg-white p-4">
            <Text className="text-2xl font-semibold capitalize">Habit Streaks</Text>
            <TopStreakCard />
          </View>
        )}
        renderItem={() => (
          <SwipeableItem onDelete={() => {}} className="mx-4">
            {/* <HabitCard /> */}
            <Text>Habit</Text>
          </SwipeableItem>
        )}
      />
    </View>
  )
}

function TopStreakCard() {
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
          <View className="flex w-full flex-row items-center gap-4 border-b border-gray-200 p-2">
            <View className="flex size-8 items-center justify-center rounded-full bg-yellow-400">
              <Text className="font-semibold text-white">1</Text>
            </View>
            <Text className="flex-1 text-sm font-semibold">Meditate</Text>
            <Text className="text-sm font-semibold">12</Text>
          </View>
          <View className="flex w-full flex-row items-center gap-4 border-b border-gray-200 p-2">
            <View className="flex size-8 items-center justify-center rounded-full bg-gray-400">
              <Text className="font-semibold text-white">2</Text>
            </View>
            <Text className="flex-1 text-sm font-semibold">Meditate</Text>
            <Text className="text-sm font-semibold">12</Text>
          </View>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
