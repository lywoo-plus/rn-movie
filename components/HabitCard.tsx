import { HabitRecord } from '@/types/pb-types'
import AntDesign from '@expo/vector-icons/AntDesign'
import colors from 'tailwindcss/colors'
import { Badge } from './ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Text } from './ui/text'

export default function HabitCard({
  title,
  description,
  frequency,
  streak_count,
}: HabitRecord) {
  return (
    <Card className="p-4">
      <CardHeader className="p-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-foreground">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between p-2">
        <Badge variant={'secondary'} className="min-w-11 bg-yellow-200">
          <AntDesign name="fire" size={16} color={colors.yellow[600]} />
          <Text className="text-center capitalize text-yellow-800">
            {streak_count} day streak
          </Text>
        </Badge>
        <Badge variant={'secondary'} className="bg-blue-100">
          <Text className="text-center capitalize text-blue-600">{frequency}</Text>
        </Badge>
      </CardFooter>
    </Card>
  )
}
