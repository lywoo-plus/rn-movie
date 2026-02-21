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
    const todayDate = new Date().toISOString().split('T')[0]

    return pb.collection('habit').getFullList({
      sort: '-updated',
      filter: `last_completed_date != "${todayDate}" || last_completed_date = null`,
    })
  },

  async fetchTopStreakHabits() {
    return await pb.collection('habit').getList(1, 3, {
      sort: '-streak_count',
    })
  },

  async fetchCompletedHabits() {
    return pb.collection('habit').getFullList({
      sort: '-updated',
      filter: 'last_completed_date != null',
    })
  },

  async deleteHabit(id: string) {
    return pb.collection('habit').delete(id)
  },

  async completeHabit(id: string) {
    await pb.collection('habit_completed').create({
      habit_id: id,
      user_id: pb.authStore.record?.id,
    })

    const foundHabit = await pb.collection('habit').getOne(id)
    if (foundHabit) {
      await pb.collection('habit').update(id, {
        streak_count: foundHabit.streak_count + 1,
        last_completed_date: new Date().toISOString().split('T')[0],
      })
    }
  },
}
