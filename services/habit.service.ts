import { HabitFormValues } from '@/components/HabitForm'
import pb from '@/lib/pocketbase'

export const HabitService = {
  async createHabit(payload: HabitFormValues) {
    return pb.collection('habit').create({
      ...payload,
      user_id: pb.authStore.record?.id,
      streak_count: 0,
    })
  },

  async fetchHabits() {
    return pb.collection('habit').getFullList({ sort: '-created' })
  },
}
