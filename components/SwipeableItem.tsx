import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { Text } from './ui/text'

export default function SwipeableItem({
  className,
  children,
  onDelete,
}: {
  className?: string
  children: React.ReactNode
  onDelete: () => void
}) {
  const swipeableRef = useRef<React.ComponentRef<typeof ReanimatedSwipeable>>(null)

  function renderLeftActions() {
    return (
      <TouchableOpacity
        onPress={() => {
          onDelete()
          swipeableRef.current?.close()
        }}
        className="flex flex-1 flex-row items-center justify-start gap-2 rounded-xl bg-red-600 p-4"
      >
        <MaterialIcons name="delete-forever" size={32} color="white" />
        <Text className="font-semibold text-white">Delete</Text>
      </TouchableOpacity>
    )
  }

  function renderRightActions() {
    return (
      <TouchableOpacity
        onPress={() => {
          onDelete()
          swipeableRef.current?.close()
        }}
        className="flex flex-1 flex-row items-center justify-end gap-2 rounded-xl bg-green-600 p-4"
      >
        <Text className="font-semibold text-white">Complete</Text>
        <MaterialIcons name="check-circle" size={32} color="white" />
      </TouchableOpacity>
    )
  }

  return (
    <View className={className}>
      <ReanimatedSwipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        overshootRight={false}
        overshootLeft={false}
      >
        {children}
      </ReanimatedSwipeable>
    </View>
  )
}
