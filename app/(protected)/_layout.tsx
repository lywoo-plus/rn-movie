import { useAuthStore } from '@/stores/useAuthStore'
import { Stack, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

export default function _layout() {
  const authUser = useAuthStore((s) => s.authUser)

  const router = useRouter()

  useEffect(() => {
    if (!authUser) {
      router.replace('/(auth)')
    }
  }, [authUser])

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
