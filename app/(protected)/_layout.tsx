import Feather from '@expo/vector-icons/Feather'
import { Tabs } from 'expo-router'
import React from 'react'
import colors from 'tailwindcss/colors'

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.gray[100] },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.gray[100],
          borderRadius: 40,
          borderWidth: 1,
          borderColor: colors.gray[300],
          marginHorizontal: 18,
          marginBottom: 24,
          height: 56,
          position: 'absolute',
          overflow: 'hidden',
        },
        tabBarActiveTintColor: colors.green[600],
        tabBarInactiveTintColor: colors.gray[600],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habits",
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streak"
        options={{
          title: 'Streak',
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-habit"
        options={{
          title: 'Add Habit',
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
