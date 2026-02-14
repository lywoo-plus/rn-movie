import SwipeableItem from '@/components/SwipeableItem'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import pb from '@/lib/pocketbase'
import { PocketBaseService } from '@/services/pocketbase.service'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import React from 'react'
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
        renderItem={() => (
          <SwipeableItem onDelete={() => {}} className="mx-4">
            <HabitCard />
          </SwipeableItem>
        )}
      />
    </View>
  )
}

function HabitCard() {
  return (
    <Card className="p-4">
      <CardHeader className="p-2">
        <CardTitle>Meditate</CardTitle>
        <CardDescription className="text-foreground">
          5 minutes of meditation every morning
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between p-2">
        <Badge variant={'secondary'} className="min-w-11 bg-yellow-200">
          <AntDesign name="fire" size={16} color={colors.yellow[600]} />
          <Text className="text-center capitalize text-yellow-800">0 day streak</Text>
        </Badge>
        <Badge variant={'secondary'} className="bg-blue-100">
          <Text className="text-center capitalize text-blue-600">Daily</Text>
        </Badge>
      </CardFooter>
    </Card>
  )
}
