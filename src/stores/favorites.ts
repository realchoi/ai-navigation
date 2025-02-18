import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Website } from '#/website'

export const useFavoriteStore = defineStore('favorites', () => {
  // 使用 localStorage 初始化收藏列表
  const favorites = ref<Website[]>(JSON.parse(localStorage.getItem('aiFavorites') || '[]'))

  const isFavorite = (id: string) => favorites.value.some(item => String(item.id) === id)

  const addFavorite = (site: Website) => {
    if (!isFavorite(String(site.id))) {
      favorites.value.push(site)
      // 每次更新后保存到 localStorage
      localStorage.setItem('aiFavorites', JSON.stringify(favorites.value))
    }
  }

  const removeFavorite = (id: string) => {
    const index = favorites.value.findIndex(item => String(item.id) === id)
    if (index !== -1) {
      favorites.value.splice(index, 1)
      // 每次更新后保存到 localStorage
      localStorage.setItem('aiFavorites', JSON.stringify(favorites.value))
    }
  }

  return { favorites, isFavorite, addFavorite, removeFavorite }
}) 