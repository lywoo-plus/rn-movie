import { NAV_THEME } from '@/lib/theme'
import { ThemeProvider } from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Toaster } from 'sonner-native'
import './global.css'

const queryClient = new QueryClient()

export default function RootLayout() {
  const { colorScheme } = useColorScheme()

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <StatusBar backgroundColor={colorScheme ?? 'light'} />

          <QueryClientProvider client={queryClient}>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            </Stack>
          </QueryClientProvider>

          <PortalHost />

          <Toaster />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
