<template>
  <!-- 添加暗色主题配置 -->
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-layout>
        <n-layout-header class="header-fixed">
          <div class="header">
            <div class="header-content">
              <div class="header-left">
                <h1>BestAI</h1>
                <n-menu mode="horizontal" :options="menuOptions" @update:value="handleMenuClick" :value="activeKey" class="nav-menu" />
              </div>

              <div class="auth-buttons">
                <n-button size="small" quaternary class="login-btn" @click="handleLogin">
                  登录
                </n-button>
                <n-button size="small" quaternary class="register-btn" @click="handleRegister">
                  注册
                </n-button>
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
import { ref, watchEffect } from 'vue'

const router = useRouter()
const route = useRoute()

// 当前选中的菜单项
const activeKey = ref('')

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
</script>

<style>
:root {
  /* 修改为黑白配色 */
  --primary-color: #ffffff;
  --primary-hover: #e0e0e0;
  --dark-gray: #121212;
  --text-color: #ffffff;
  --background-color: #121212;
  --secondary-background: #1e1e1e;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
}

.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* 修改背景色为半透明 */
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header {
  padding: 0;
  /* 移除原来的背景色，使用 header-fixed 的背景色 */
  background: transparent;
  /* 移除原来的模糊效果，避免重复 */
  backdrop-filter: none;
  border-bottom: none; /* 移除原来的边框 */
  /* 调整阴影效果 */
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
  gap: 24px;
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
  background-color: #ffffff;
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

/* 移动端适�� */
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
  color: var(--text-primary) !important;
  font-weight: 500 !important;
  margin: 0 !important;
  padding: 0 14px !important; /* 增加水平内边距 */
  background: transparent !important;
  position: relative !important; /* 为下划线定位做准备 */
}

/* 选中状态的下划线效果 */
.nav-menu .n-menu-item-content.n-menu-item-content--selected::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background-color: #333;
  transition: all 0.3s ease;
}

/* 悬浮效果 */
.nav-menu .n-menu-item-content:hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background-color: #333;
  transition: all 0.3s ease;
}

/* 添加初始状态，使下划线从透明开始 */
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

/* 确保菜单项之间没有任何间隔 */
.n-menu-item-content {
  margin: 0 !important;
  padding: 0 !important;
}

/* 移除原来的悬浮背景效果 */
.nav-menu .n-menu-item:hover {
  background: transparent !important;
}
</style>