<template>
  <!-- 添加 cursor-pointer 类和点击事件 -->
  <a :href="site.url" target="_blank" class="ai-card cursor-pointer">
    <div class="card-header">
      <img :src="logoUrl" :alt="site.name" class="site-logo" @error="handleLogoError">
      <h3 class="site-name">{{ site.name }}</h3>
      <!-- 添加箭头图标 -->
      <div class="arrow-icon">
        <n-icon size="20"><external-link /></n-icon>
      </div>
    </div>

    <div class="card-body">
      <p class="description">{{ site.description }}</p>
      <!-- 添加 URL 显示 -->
      <div class="site-url">
        <n-ellipsis>{{ site.url }}</n-ellipsis>
      </div>
      <div class="tags">
        <n-tag v-for="tag in site.tags" :key="tag" size="small" :bordered="false">
          {{ tag }}
        </n-tag>
      </div>
    </div>

    <div class="card-footer">
      <n-button strong secondary class="favorite-btn" :class="{ 'is-favorited': isFavorited }"
        @click.stop.prevent="toggleFavorite" size="small">
        {{ isFavorited ? '已收藏' : '收藏' }}
      </n-button>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NTag, NButton, NIcon, NEllipsis } from 'naive-ui'
import { ExternalLink } from '@vicons/tabler'  // 使用 ExternalLink 图标
import { useFavoriteStore } from '@/stores/favorites'
import { getLocalLogo, DEFAULT_LOGO } from '@/utils/logoUtils'
import type { AiWebsiteDto } from '@/api/website'

const props = defineProps<{
  site: AiWebsiteDto
}>()

const favoriteStore = useFavoriteStore()
const isFavorited = computed(() => favoriteStore.isFavorite(String(props.site.id)))

const toggleFavorite = () => {
  if (isFavorited.value) {
    favoriteStore.removeFavorite(String(props.site.id))
  } else {
    favoriteStore.addFavorite(props.site)
  }
}

// 添加 logo URL 处理
const logoUrl = ref(getLocalLogo(props.site.logo))

// 处理图片加载失败
const handleLogoError = () => {
  logoUrl.value = DEFAULT_LOGO
}
</script>

<style scoped>
.ai-card {
  width: 100%;
  border-radius: 4px;
  padding: 20px;
  background: #ffffff;
  color: #333333;
  /* 改为深色字体 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  min-height: 220px;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  text-decoration: none;
}

.ai-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  position: relative;
  /* 为箭头图标定位 */
}

.arrow-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #666666;
}

.ai-card:hover .arrow-icon {
  opacity: 1;
}

.site-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.site-name {
  margin: 0;
  font-size: 1.2em;
  color: var(--text-primary);
  font-weight: 600;
  color: #333333;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.site-url {
  font-size: 0.9em;
  color: #999;
  margin-bottom: 12px;
  word-break: break-all;
}

.description {
  margin: 0 0 12px 0;
  color: var(--text-secondary);
  line-height: 1.5;
  color: #666666;
  /* 稍微浅一点的深色 */
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 16px;
}

.favorite-btn {
  border: 1px solid #333 !important;
  background-color: #fff !important;
  color: #333 !important;
  transition: all 0.3s ease !important;
}

.favorite-btn:hover {
  background-color: #333 !important;
  color: #fff !important;
  border-color: #333 !important;
}

.favorite-btn.is-favorited {
  background-color: #333 !important;
  color: #fff !important;
  border-color: #333 !important;
}

.favorite-btn.is-favorited:hover {
  opacity: 0.9;
}
</style>