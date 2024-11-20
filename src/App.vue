<template>
  <!-- 添加暗色主题配置 -->
  <n-config-provider :theme="darkTheme"></n-config-provider>
  <n-config-provider>
    <n-message-provider>
      <n-layout>
        <n-layout-header class="header-fixed">
          <div class="header">
            <div class="header-content">
              <div class="header-left">
                <h1>BestAI</h1>
                <n-menu mode="horizontal" :options="menuOptions" @update:value="handleMenuClick" class="nav-menu" />
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
import { darkTheme } from 'naive-ui'  // 导入暗色主题
import { useRouter } from 'vue-router'
import {
  NConfigProvider,
  NMessageProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NButton
} from 'naive-ui'

const router = useRouter()

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
  // 处理登录逻辑
  console.log('登录按钮点击')
}

const handleRegister = () => {
  // 处理注册逻辑
  console.log('注册按钮点击')
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
  background-color: rgba(255, 255, 255, 0.8);
  /* 保持一致的背景色 */
  backdrop-filter: blur(10px);
}

.header {
  padding: 0;
  background-color: rgba(255, 255, 255, 0.8);
  /* 半透明白色背景 */
  backdrop-filter: blur(10px);
  /* 磨砂玻璃效果 */
  border-bottom: 1px solid #eee;
  /* 浅灰色边框 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  /* 更柔和的阴影 */
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
  color: var(--text-primary) !important;
  font-weight: 500 !important;
  margin: 0 !important;
  padding: 0 6px !important;
}

/* 确保菜单项之间没有任何间隔 */
.n-menu-item-content {
  margin: 0 !important;
  padding: 0 !important;
}
</style>