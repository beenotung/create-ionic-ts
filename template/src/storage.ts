import { Preferences } from '@capacitor/preferences'

export let storage = {
  get: async (key: string) => {
    let result = await Preferences.get({ key })
    return result.value
  },
  set: async (key: string, value: string) => {
    await Preferences.set({ key, value })
  },
}
