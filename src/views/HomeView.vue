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
const categoryOptions = computed(() => {
  const categories = new Set<string>()
  aiSites.forEach(site => {
    site.category.forEach(cat => categories.add(cat))
  })
  return Array.from(categories).map(cat => ({
    label: cat,
    value: cat
  }))
})

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
})

/**
 * 卸载
 */
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.container {
  width: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
}

.filters-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 32px;
  padding: 0 24px;
  display: flex;
  justify-content: center;
}

.filters {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 12px;
}

.sites-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  min-height: calc(100vh - 200px);
}

.sites-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(320px, 1fr));
  gap: 24px;
  justify-content: center;
}

/* 平板设备断点 */
@media (max-width: 1024px) {
  .sites-grid {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
    gap: 24px;
  }
}

/* 移动设备断点 */
@media (max-width: 640px) {
  .container {
    padding: 16px 0;
  }

  .sites-grid {
    grid-template-columns: minmax(280px, 1fr);
    gap: 20px;
  }

  .filters-wrapper {
    padding: 0 16px;
    margin-bottom: 24px;
  }

  .sites-container {
    padding: 0 16px;
  }
}

.loading-indicator,
.no-more {
  padding: 20px 0;
  text-align: center;
  color: #666;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>