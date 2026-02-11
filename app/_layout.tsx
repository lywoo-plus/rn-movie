import { NAV_THEME } from '@/lib/theme'
import { ThemeProvider } from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Toaster } from 'sonner-native'
import './global.css'

export default function RootLayout() {
  const { colorScheme } = useColorScheme()

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <StatusBar backgroundColor={colorScheme ?? 'light'} />

          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          </Stack>

          <PortalHost />

          <Toaster />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
