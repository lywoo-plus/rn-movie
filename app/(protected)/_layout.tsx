import { Stack, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

export default function _layout() {
  const isAuthenticated = true

  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)')
    }
  }, [isAuthenticated])

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
