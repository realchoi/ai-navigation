<template>
  <div class="register-container">
    <n-card title="注册账号" class="register-card">
      <n-form
        ref="formRef"
        :model="registerForm"
        :rules="rules"
      >
        <n-form-item label="账号" path="account">
          <n-input
            v-model:value="registerForm.account"
            placeholder="请输入邮箱或手机号"
          />
        </n-form-item>

        <n-form-item label="姓名" path="name">
          <n-input
            v-model:value="registerForm.name"
            placeholder="请输入姓名"
          />
        </n-form-item>

        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="registerForm.password"
            type="password"
            placeholder="请输入密码"
            show-password-on="click"
          />
        </n-form-item>

        <n-form-item label="确认密码" path="confirmPassword">
          <n-input
            v-model:value="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password-on="click"
          />
        </n-form-item>

        <div class="action-row">
          <n-button
            type="primary"
            @click="handleRegister"
            :loading="loading"
            size="large"
            block
          >
            注册
          </n-button>
          <div class="login-link">
            已有账号？
            <n-button text tag="a" @click="router.push('/login')">
              去登录👉
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

const router = useRouter()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const loading = ref(false)

const registerForm = reactive({
  account: '',
  name: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { 
      required: true,
      message: '请再次输入密码',
      trigger: 'blur'
    },
    {
      validator: (rule: any, value: string) => {
        console.log(rule, value);
        return value === registerForm.password
      },
      message: '两次输入的密码不一致',
      trigger: 'blur'
    }
  ]
}

const handleRegister = async () => {
  try {
    loading.value = true
    await formRef.value?.validate()
    
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account: registerForm.account,
        name: registerForm.name,
        password: registerForm.password
      })
    })

    if (response.ok) {
      message.success('注册成功')
      router.push('/login')
    } else {
      message.error(`注册失败：${response.statusText}`)
    }
  } catch (error) {
    console.error('注册失败:', error)
    message.error('注册失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-card {
  width: 400px;
}

.action-row {
  margin-top: 24px;
}

.login-link {
  margin-top: 16px;
  text-align: center;
  color: #606266;
}
</style>