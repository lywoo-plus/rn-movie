import { authService } from '@/api/authService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useAuthStore } from '@/stores/useAuthStore'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { toast } from 'sonner-native'
import { z } from 'zod'

const schema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export default function AuthForm() {
  const router = useRouter()

  const [mode, setMode] = useState<'login' | 'signup'>('login')

  function handleSwitchAuthMode() {
    setMode((m) => (m === 'login' ? 'signup' : 'login'))
  }

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'lywoo@gmail.com',
      password: 'arstarst',
    },
  })

  const login = useAuthStore((s) => s.login)

  async function onSubmit(data: any) {
    try {
      const { email } = await authService.login(data)
      login(email)
      router.replace('/(protected)')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong'
      toast.error(message)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="flex-1 justify-center gap-4 p-6">
        <Text className="mb-4 text-center text-2xl font-semibold">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              inputMode="email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text className="text-xs text-red-600">{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text className="text-xs text-red-600">{errors.password.message}</Text>
        )}

        <Button disabled={isSubmitting} className="w-full" onPress={handleSubmit(onSubmit)}>
          {mode === 'login' ? (
            <>
              <MaterialCommunityIcons name="login-variant" size={16} color="white" />
              <Text>Sign In</Text>
            </>
          ) : (
            <>
              <Feather name="user-plus" size={16} color={'white'} />
              <Text>Sign Up</Text>
            </>
          )}
        </Button>

        <Button className="w-full" variant={'ghost'} onPress={handleSwitchAuthMode}>
          <Text>
            {mode === 'signup'
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}
