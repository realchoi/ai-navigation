import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Website } from '#/website'

export const useFavoriteStore = defineStore('favorites', () => {
  const favorites = ref<Website[]>([])

  // 从 localStorage 加载收藏数据
  const loadFavorites = () => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      favorites.value = JSON.parse(saved)
    }
  }

  // 保存到 localStorage
  const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const addFavorite = (site: Website) => {
    favorites.value.push(site)
    saveFavorites()
  }

  const removeFavorite = (siteId: string) => {
    favorites.value = favorites.value.filter(site => site.id !== siteId)
    saveFavorites()
  }

  const isFavorite = (siteId: string) => {
    return favorites.value.some(site => site.id === siteId)
  }

  return {
    favorites,
    loadFavorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }
}) 