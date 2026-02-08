import { useAuthStore } from '@/stores/useAuthStore'
import { Redirect, Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  const authUser = useAuthStore((s) => s.authUser)

  if (authUser) {
    return <Redirect href="/(protected)" />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
