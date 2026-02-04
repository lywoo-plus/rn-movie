import { NAV_THEME } from '@/lib/theme'
import { ThemeProvider } from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'
import { Stack } from 'expo-router'
import { StatusBar, useColorScheme } from 'react-native'
import './global.css'

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <ThemeProvider value={NAV_THEME[colorScheme]}>
      <StatusBar backgroundColor={colorScheme === 'dark' ? 'light' : 'dark'} />

      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack>

      <PortalHost />
    </ThemeProvider>
  )
}
