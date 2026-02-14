import pb from '@/lib/pocketbase'
import { Redirect, Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  const token = pb.authStore.token

  if (token) {
    return <Redirect href="/(protected)" />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
