import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfo } from '@/api/auth'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)

  function setUserInfo(info: UserInfo | null) {
    userInfo.value = info
  }

  function loadUserInfo() {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      userInfo.value = JSON.parse(userStr)
    }
  }

  return {
    userInfo,
    setUserInfo,
    loadUserInfo
  }
}) 