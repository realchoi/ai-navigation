<template>
  <div class="login-container">
    <n-card title="账号登录" class="login-card">
      <n-form ref="formRef" :model="loginForm" :rules="rules">
        <n-form-item label="账号" path="account">
          <n-input v-model:value="loginForm.account" placeholder="请输入邮箱或手机号" />
        </n-form-item>

        <n-form-item label="密码" path="password">
          <n-input v-model:value="loginForm.password" type="password" placeholder="请输入密码" show-password-on="click" />
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
  account: '',
  password: ''
})

const rules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' }
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
      username: loginForm.account,
      password: loginForm.password
    })

    localStorage.setItem('token', data.token)
    message.success('登录成功')
    router.push('/dashboard')
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