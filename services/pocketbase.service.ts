import pb from '@/lib/pocketbase'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const PocketBaseService = {
  async signUp(payload: { email: string; password: string }) {
    await pb.collection('users').create({
      ...payload,
      passwordConfirm: payload.password,
      name: payload.email.split('@')[0],
    })
  },

  async signIn(payload: { email: string; password: string }) {
    return pb.collection('users').authWithPassword(payload.email, payload.password)
  },

  async signOut() {
    return pb.authStore.clear()
  },

  async loadAuth() {
    const stored = await AsyncStorage.getItem('pb_auth')
    if (stored) {
      pb.authStore.loadFromCookie(stored)
    }
  },
}
