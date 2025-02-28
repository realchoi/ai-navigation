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
import { queryPage as queryCategoryPage } from '@/api/category'
import { queryPage as queryWebsitePage } from '@/api/website'
import type { AiWebsiteDto } from '@/api/website'

/**
 * 搜索文本
 */
const searchQuery = ref('')
/**
 * 选择的分类
 */
const selectedCategory = ref('')
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
 * 添加网站列表状态
 */
const websites = ref<AiWebsiteDto[]>([])

/**
 * 获取分类数据
 */
const fetchCategories = async () => {
  try {
    const { items } = await queryCategoryPage(1, 99999)
    categoryOptions.value = items.map(category => ({
      label: category.name,
      value: category.id
    }))
  } catch (error) {
    console.error('获取分类失败:', error)
  }
}

/**
 * 修改为从接口获取数据
 */
const fetchWebsites = async () => {
  try {
    isLoading.value = true
    const { items, total } = await queryWebsitePage(
      selectedCategory.value,
      searchQuery.value,
      currentPage.value,
      itemsPerPage
    );

    if (currentPage.value === 1) {
      websites.value = items
    } else {
      websites.value = [...websites.value, ...items]
    }

    hasMore.value = websites.value.length < total
  } catch (error) {
    console.error('获取网站列表失败:', error)
  } finally {
    isLoading.value = false
  }
}

/**
 * 过滤后的站点
 */
const filteredSites = computed(() => {
  return websites.value.filter(site => {
    const matchesSearch = searchQuery.value
      ? site.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      site.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
      : true

    const matchesCategory = selectedCategory.value
      ? site.categoryId === selectedCategory.value
      : true

    return matchesSearch && matchesCategory
  })
})

/**
 * 显示的站点
 */
const displayedSites = computed(() => filteredSites.value)

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
const loadMore = async () => {
  if (!isLoading.value && hasMore.value) {
    currentPage.value++
    await fetchWebsites()
  }
}

/**
 * 监听搜索和分类
 */
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
  hasMore.value = true
  websites.value = []
  fetchWebsites()
})

/**
 * 挂载
 */
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchCategories()
  fetchWebsites()
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