import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: 'Loic',
    birthday: '2003=10-12',
    id: 12
  })
  

  return { user }
})
