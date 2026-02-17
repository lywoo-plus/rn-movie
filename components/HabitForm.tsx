import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Text } from '@/components/ui/text'
import { HabitService } from '@/services/habit.service'
import Feather from '@expo/vector-icons/Feather'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { toast } from 'sonner-native'
import { z } from 'zod'

const frequencyValues = ['daily', 'weekly', 'monthly'] as const

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  frequency: z.enum(frequencyValues),
})

export type HabitFormValues = z.infer<typeof schema>

// type Frequency = (typeof frequencyValues)[number]

export default function HabitForm() {
  const router = useRouter()

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<HabitFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      frequency: 'daily',
    },
  })

  const queryClient = useQueryClient()

  const { mutate: createHabit, isPending } = useMutation({
    mutationKey: ['habit', 'create'],
    mutationFn: HabitService.createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
      toast.success('Habit created successfully')
      router.navigate('/(protected)')
      reset()
    },
  })

  function onSubmit(data: HabitFormValues) {
    try {
      createHabit(data)
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
      <ScrollView contentContainerClassName="flex-1 item-center justify-center">
        <View className="flex-1 justify-center gap-4 p-6">
          <Text className="mb-4 text-center text-2xl font-semibold">Add Habit</Text>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Title"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.title && (
            <Text className="text-xs text-red-600">{errors.title.message}</Text>
          )}

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Description"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.description && (
            <Text className="text-xs text-red-600">{errors.description.message}</Text>
          )}

          <Controller
            control={control}
            name="frequency"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                value={value}
                onValueChange={onChange}
                className="flex flex-row justify-between"
              >
                {frequencyValues.map((f) => (
                  <View key={f} className="flex flex-row items-center gap-3">
                    <RadioGroupItem value={f} id={f} />
                    <Label htmlFor={f} className="capitalize" onPress={() => onChange(f)}>
                      {f}
                    </Label>
                  </View>
                ))}
              </RadioGroup>
            )}
          />

          <Button disabled={isPending} className="w-full" onPress={handleSubmit(onSubmit)}>
            <Feather name="plus" size={16} color={'white'} />
            <Text>Add Habit</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
