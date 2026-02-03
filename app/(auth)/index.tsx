import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { z } from 'zod'

const schema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: any) {
    console.log('🪲🪲🪲🪲🪲')
    console.log(data)
    console.log('🪲🪲🪲🪲🪲')
  }

  function handleSwitchAuthMode() {
    setMode((m) => (m === 'login' ? 'signup' : 'login'))
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

        <Button className="w-full" onPress={handleSubmit(onSubmit)}>
          <Text>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</Text>
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
