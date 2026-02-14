import { PocketBaseService } from '@/services/pocketbase.service'
import type { TypedPocketBase } from '@/types/pb-types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://0.0.0.0:8090') as TypedPocketBase

// Load stored auth on startup
PocketBaseService.loadAuth()

// Persist on change
pb.authStore.onChange(() => {
  AsyncStorage.setItem('pb_auth', pb.authStore.exportToCookie())
})

export default pb
