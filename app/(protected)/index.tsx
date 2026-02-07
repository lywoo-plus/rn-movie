import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'

export default function index() {
  const { authUser, logout } = useAuthStore(
    useShallow((s) => ({
      authUser: s.authUser,
      logout: s.logout,
    }))
  )

  const router = useRouter()

  function handleLogout() {
    logout()
    router.replace('/(auth)')
  }

  return (
    <View className="w-full flex-1 flex-col items-center justify-center gap-4">
      <Text>{authUser?.email}</Text>

      <Button onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>

      <Button onPress={() => router.back()}>
        <Text>Back</Text>
      </Button>
    </View>
  )
}
