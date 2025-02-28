<template>
  <div class="login-container">
    <n-card title="账号登录" class="login-card">
      <n-form ref="formRef" :model="loginForm" :rules="rules">
        <n-form-item label="账号" path="identifier">
          <n-input-group>
            <n-select v-model:value="loginForm.identityType" :options="identityTypeOptions" style="width: 140px"
              bordered />
            <n-input v-model:value="loginForm.identifier" :placeholder="getPlaceholder()" />
          </n-input-group>
        </n-form-item>

        <n-form-item label="密码" path="credential">
          <n-input v-model:value="loginForm.credential" type="password" placeholder="请输入密码" show-password-on="click" />
        </n-form-item>

        <div class="action-row">
          <n-button type="primary" @click="handleLogin" :loading="loading" size="large" block>
            登录
          </n-button>
          <div class="register-link">
            还没有账号？
            <n-button text tag="a" @click="router.push('/register')">
              去注册👉
            </n-button>
          </div>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { login } from '@/api/auth'

const router = useRouter()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const loading = ref(false)

const loginForm = reactive({
  identityType: 1,
  identifier: '',
  credential: ''
})

const identityTypeOptions = [
  { label: '手机号', value: 1 },
  { label: '邮箱', value: 2 },
  { label: '用户名', value: 3 }
]

const getPlaceholder = () => {
  const map: Record<number, string> = {
    1: '请输入手机号',
    2: '请输入邮箱',
    3: '请输入用户名'
  }
  return map[loginForm.identityType]
}

const rules = {
  identifier: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      validator: (_rule: any, value: string) => {
        if (!value) return true  // 如果为空，让 required 规则去处理
        if (loginForm.identityType === 1) {
          const phoneRegex = /^1[3-9]\d{9}$/
          if (!phoneRegex.test(value)) {
            return new Error('请输入正确的手机号格式')
          }
        } else if (loginForm.identityType === 2) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            return new Error('请输入正确的邮箱格式')
          }
        }
        return true
      },
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  try {
    loading.value = true
    await formRef.value?.validate()

    const data = await login({
      identityType: loginForm.identityType,
      identifier: loginForm.identifier,
      credential: loginForm.credential
    })

    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('user', JSON.stringify(data.userInfo))
    message.success('登录成功')
    router.push('/dashboard')
  } catch (error) {
    // 这里不需要显示错误消息，因为请求拦截器已经处理了
    // 但我们仍然需要catch以防止未处理的promise rejection
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.login-card {
  width: 400px;
  max-height: 90vh;
  margin: 20px;
}

.action-row {
  margin-top: 24px;
}

.register-link {
  margin-top: 16px;
  text-align: center;
  color: #606266;
}
</style>