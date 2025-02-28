<template>
  <div class="container">
    <div class="filters-wrapper">
      <n-input-group class="filters">
        <n-input v-model:value="searchQuery" placeholder="搜索 AI 站点..." clearable />
        <n-select v-model:value="selectedCategory" :options="categoryOptions" placeholder="选择分类" clearable />
      </n-input-group>
    </div>

    <div class="sites-container">
      <div class="sites-grid">
        <AICard v-for="site in displayedSites" :key="site.id" :site="site" />
      </div>

      <div v-if="isLoading" class="loading-indicator">
        <n-spin size="small" />
        <span>正在加载...</span>
      </div>
      <div v-if="!hasMore && displayedSites.length > 0" class="no-more">
        没有更多数据了
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import AICard from '@/components/AICard.vue'
import { aiSites } from '@/data/ai-sites'
import { queryPage } from '@/api/category'

/**
 * 搜索文本
 */
const searchQuery = ref('')
/**
 * 选择的分类
 */
const selectedCategory = ref(null)
/**
 * 分类选项
 */
const categoryOptions = ref<Array<{ label: string, value: string }>>([])

/**
 * 当前页码
 */
const currentPage = ref(1)
/**
 * 每页显示的站点数量
 */
const itemsPerPage = 10
/**
 * 是否正在加载
 */
const isLoading = ref(false)
/**
 * 是否还有更多数据
 */
const hasMore = ref(true)

/**
 * 获取分类数据
 */
const fetchCategories = async () => {
  try {
    const { items } = await queryPage(1, 99999)
    categoryOptions.value = items.map(category => ({
      label: category.name,
      value: category.id
    }))
  } catch (error) {
    console.error('获取分类失败:', error)
  }
}

/**
 * 过滤后的站点
 */
const filteredSites = computed(() => {
  return aiSites.filter(site => {
    const matchesSearch = searchQuery.value
      ? site.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      site.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
      : true

    const matchesCategory = selectedCategory.value
      ? site.category.includes(selectedCategory.value)
      : true

    return matchesSearch && matchesCategory
  })
})

/**
 * 显示的站点
 */
const displayedSites = computed(() => {
  return filteredSites.value.slice(0, currentPage.value * itemsPerPage)
})

/**
 * 滚动加载更多
 */
const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  const isBottomReached = scrollTop + clientHeight >= scrollHeight - 100

  if (isBottomReached && !isLoading.value && hasMore.value) {
    loadMore()
  }
}

/**
 * 加载更多
 */
const loadMore = () => {
  isLoading.value = true
  setTimeout(() => {
    const totalItems = filteredSites.value.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    if (currentPage.value < totalPages) {
      currentPage.value++
      hasMore.value = true
    } else {
      hasMore.value = false
    }
    isLoading.value = false
  }, 500)
}

/**
 * 监听搜索和分类
 */
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
  hasMore.value = true
})

/**
 * 挂载
 */
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchCategories()
})

/**
 * 卸载
 */
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import '@/assets/css/common.css';
</style>