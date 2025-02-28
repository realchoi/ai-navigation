<template>
  <div class="register-container">
    <n-card title="注册账号" class="register-card">
      <n-form ref="formRef" :model="registerForm" :rules="rules">
        <n-form-item label="账号" path="identifier">
          <n-input-group>
            <n-select v-model:value="registerForm.identityType" :options="identityTypeOptions" style="width: 140px"
              bordered />
            <n-input v-model:value="registerForm.identifier" :placeholder="getPlaceholder()" />
          </n-input-group>
        </n-form-item>

        <n-form-item label="昵称" path="nickName">
          <n-input v-model:value="registerForm.nickName" placeholder="请输入昵称" />
        </n-form-item>

        <n-form-item label="密码" path="credential">
          <n-input v-model:value="registerForm.credential" type="password" placeholder="请输入密码"
            show-password-on="click" />
        </n-form-item>

        <n-form-item label="确认密码" path="confirmCredential">
          <n-input v-model:value="registerForm.confirmCredential" type="password" placeholder="请再次输入密码"
            show-password-on="click" />
        </n-form-item>

        <div class="action-row">
          <n-button type="primary" @click="handleRegister" :loading="loading" size="large" block>
            注册
          </n-button>
          <div class="login-link">
            已有账号？
            <n-button text color="#ff69b4" tag="a" @click="router.push('/login')">
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
import { register } from '@/api/auth'

const router = useRouter()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const loading = ref(false)

const registerForm = reactive({
  identityType: 1, // 默认邮箱
  identifier: '',
  nickName: '',
  credential: '',
  confirmCredential: ''
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
  return map[registerForm.identityType]
}

const rules = {
  identifier: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      validator: (_rule: any, value: string) => {
        if (!value) return true  // 如果为空，让 required 规则去处理
        if (registerForm.identityType === 1) { // 手机号
          const phoneRegex = /^1[3-9]\d{9}$/
          if (!phoneRegex.test(value)) {
            return new Error('请输入正确的手机号格式')
          }
        }
        else if (registerForm.identityType === 2) { // 邮箱
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
  nickName: [
    { required: true, message: '请输入昵称', trigger: 'blur' }
  ],
  credential: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于 6 位', trigger: 'blur' }
  ],
  confirmCredential: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur'
    },
    {
      validator: (rule: any, value: string) => {
        console.log(rule, value);
        return value === registerForm.credential
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

    await register({
      identityType: registerForm.identityType,
      identifier: registerForm.identifier,
      nickName: registerForm.nickName,
      credential: registerForm.credential
    })

    // 只在成功时执行以下代码
    message.success('注册成功')
    router.push('/login')
  } catch (error) {
    // 这里不需要显示错误消息，因为请求拦截器已经处理了
    // 但我们仍然需要catch以防止未处理的promise rejection
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
  min-height: calc(100vh - 70px - 73px) !important;
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