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
        <AICard v-for="site in filteredSites" :key="site.id" :site="site" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NInput, NSelect, NInputGroup } from 'naive-ui'
import AICard from '../components/AICard.vue'
import { aiSites } from '../data/ai-sites.ts'

const searchQuery = ref('')
const selectedCategory = ref(null)

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
</style>