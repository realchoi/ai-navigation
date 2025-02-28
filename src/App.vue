<template>
  <!-- 添加暗色主题配置 -->
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-layout>
        <n-layout-header class="header-fixed">
          <div class="header">
            <div class="header-content">
              <div class="header-left">
                <router-link to="/" class="logo-container">
                  <img src="/hasome_ai.svg" alt="Logo" class="logo" />
                </router-link>
                <n-menu mode="horizontal" :options="menuOptions" @update:value="handleMenuClick" :value="activeKey" class="nav-menu" />
              </div>

              <!-- 根据登录状态显示不同的按钮 -->
              <div v-if="!userInfo" class="auth-buttons">
                <n-button size="small" quaternary class="login-btn" @click="handleLogin">
                  登录
                </n-button>
                <n-button size="small" quaternary class="register-btn" @click="handleRegister">
                  注册
                </n-button>
              </div>
              <div v-else class="user-info">
                <n-dropdown :options="userMenuOptions" @select="handleUserMenuSelect" trigger="click">
                  <div class="user-avatar">
                    <n-avatar
                      round
                      :size="32"
                      :src="userInfo.avatar || ''"
                      :fallback-src="'/default-avatar.png'"
                    />
                    <span class="username">{{ userInfo.nickName }}</span>
                  </div>
                </n-dropdown>
              </div>
            </div>
          </div>
        </n-layout-header>

        <n-layout-content class="main-content">
          <router-view />
        </n-layout-content>

        <n-layout-footer class="footer">
          <div class="footer-content">
            <span>Built by Eric Cai with <span class="heart">💗</span></span>
          </div>
        </n-layout-footer>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { themeOverrides } from '@/styles/themeOverrides'
import { useRouter, useRoute } from 'vue-router'
import { ref, watchEffect, h, onMounted } from 'vue'
import { NIcon } from 'naive-ui'
import { 
  PersonCircle as UserIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  LogOut as LogoutIcon
} from '@vicons/ionicons5'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()

// 当前选中的菜单项
const activeKey = ref('')

const userStore = useUserStore()

// 替换原来的 userInfo ref
const { userInfo } = storeToRefs(userStore)

// 初始化时从 localStorage 获取用户信息
onMounted(() => {
  userStore.loadUserInfo()
})

// 监听路由变化，更新选中状态
watchEffect(() => {
  // 从路由路径获取当前页面对应的 key
  const path = route.path
  activeKey.value = path === '/' ? 'home' : path.slice(1)
})

const menuOptions = [
  {
    label: '首页',
    key: 'home'
  },
  {
    label: '收藏',
    key: 'favorites'
  },
  {
    label: '菜单1',
    key: 'menu1'
  },
  {
    label: '菜单2',
    key: 'menu2'
  }
]

const handleMenuClick = (key: string) => {
  router.push(`/${key === 'home' ? '' : key}`)
}

const handleLogin = () => {
  router.push('/login')
}

const handleRegister = () => {
  router.push('/register')
}

// 用户菜单选项
const userMenuOptions = [
  {
    label: () => h('div', { class: 'menu-item' }, [
      h(NIcon, null, { default: () => h(UserIcon) }),
      h('span', '个人信息')
    ]),
    key: 'profile'
  },
  {
    label: () => h('div', { class: 'menu-item' }, [
      h(NIcon, null, { default: () => h(StarIcon) }),
      h('span', '我的收藏')
    ]),
    key: 'favorites'
  },
  {
    label: () => h('div', { class: 'menu-item' }, [
      h(NIcon, null, { default: () => h(SettingsIcon) }),
      h('span', '设置')
    ]),
    key: 'settings'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: () => h('div', { class: 'menu-item' }, [
      h(NIcon, null, { default: () => h(LogoutIcon) }),
      h('span', '退出登录')
    ]),
    key: 'logout'
  }
]

// 处理用户菜单选择
const handleUserMenuSelect = (key: string) => {
  switch (key) {
    case 'logout':
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      userStore.setUserInfo(null)
      router.push('/login')
      break
    case 'profile':
      router.push('/profile')
      break
    case 'favorites':
      router.push('/favorites')
      break
    case 'settings':
      router.push('/settings')
      break
  }
}
</script>

<style>
:root {
  --primary-color: #ffffff;
  --primary-hover: #e0e0e0;
  --text-color: #333333;
  --border-color: rgba(255, 255, 255, 0.1);
  --background-blur: rgba(255, 255, 255, 0.6);
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

/* 布局相关 */
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--background-blur);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header h1 {
  margin: 0;
  font-size: 1.5em;
  font-weight: 600;
  color: #333;
  /* 深灰色，与整体黑白风格搭配 */
}

.auth-buttons {
  display: flex;
  gap: 12px;
  margin-left: 12px;
}

.auth-buttons .n-button {
  padding: 6px 16px;
  font-weight: 500;
  border-radius: 0;
  transition: all 0.3s ease;
}

/* 登录按钮特殊样式 */
.login-btn {
  border: 1px solid #333 !important;
  background-color: #fff !important;
  color: #333 !important;
  transition: all 0.3s ease !important;
}

.login-btn:hover {
  background-color: #333 !important;
  color: #fff !important;
  border-color: #333 !important;
}

/* 注册按钮特殊样式 */
.register-btn {
  background-color: #333 !important;
  color: #fff !important;
  border: 1px solid #333 !important;
  transition: all 0.3s ease !important;
}

.register-btn:hover {
  opacity: 0.9;
}

/* 注册按钮悬浮效果 */
.auth-buttons .n-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 70px - 73px);
  margin-top: 70px;
}

#app {
  width: 100%;
}

.footer {
  padding: 24px 0;
  background-color: #ffffff;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
  letter-spacing: 0.5px;
}

.heart {
  display: inline-block;
  color: var(--primary-color);
  margin: 0 2px;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

/* 确保页脚始终在底部 */
.n-layout {
  min-height: 100vh;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .header-content {
    padding: 12px 16px;
  }

  .header-left {
    gap: 16px;
  }

  .auth-buttons {
    margin-left: 8px;
  }

  .footer {
    padding: 16px 0;
  }

  .footer-content {
    font-size: 13px;
  }
}

.nav-menu .n-menu-item {
  color: var(--text-color) !important;
  font-weight: 500;
  background: transparent !important;
}

.nav-menu .n-menu-item-content::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background-color: transparent;
  transition: all 0.3s ease;
}

.nav-menu .n-menu-item-content--selected::after,
.nav-menu .n-menu-item-content:hover::after {
  background-color: var(--text-color);
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-avatar:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.username {
  margin-left: 8px;
  font-size: 14px;
  color: var(--text-color);
}

/* Logo */
.logo-container {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo {
  height: 40px;
  width: auto;
}

/* 下拉菜单 */
.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-item .n-icon {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    padding: 12px 16px;
  }

  .header-left {
    gap: 16px;
  }
}
</style>