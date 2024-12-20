<template>
  <div class="user-management">
    <n-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <n-button type="primary" @click="handleAddUser">新增用户</n-button>
        </div>
      </template>

      <n-data-table
        :columns="columns"
        :data="users"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </n-card>

    <n-modal
      v-model:show="showModal"
      :title="isEdit ? '编辑用户' : '新增用户'"
      preset="card"
      style="width: 500px"
    >
      <n-form
        ref="formRef"
        :model="currentUser"
        :rules="rules"
        label-placement="left"
        label-width="80"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="currentUser.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="currentUser.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item v-if="!isEdit" label="密码" path="password">
          <n-input
            v-model:value="currentUser.password"
            type="password"
            placeholder="请输入密码"
            show-password-on="click"
          />
        </n-form-item>
        <n-form-item label="角色" path="roles">
          <n-select
            v-model:value="currentUser.roles"
            multiple
            :options="roleOptions"
            placeholder="请选择角色"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" @click="handleSaveUser">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { h, ref, reactive } from 'vue';
import type { User, Role } from '#/system/permission';
import { useMessage, NTag, NSpace, NButton } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';

const message = useMessage();
const users = ref<User[]>([]);
const roleOptions = ref<{ label: string; value: Role }[]>([]);
const showModal = ref(false);
const isEdit = ref(false);
const formRef = ref(null);

interface UserForm extends User {
  password?: string;
}

const currentUser = reactive<UserForm>({
  id: 0,
  username: '',
  email: '',
  roles: [],
  status: 'active',
  createdAt: new Date(),
  updatedAt: new Date()
});

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40]
});

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: 'blur'
    }
  ],
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  },
  roles: {
    required: true,
    type: 'array',
    message: '请选择角色',
    trigger: 'change'
  }
};

const columns: DataTableColumns<User> = [
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '状态',
    key: 'status',
    render(row) {
      return h(
        NTag,
        {
          type: row.status === 'active' ? 'success' : 'error',
          style: {
            marginRight: '6px'
          }
        },
        {
          default: () => (row.status === 'active' ? '启用' : '禁用')
        }
      );
    }
  },
  {
    title: '角色',
    key: 'roles',
    render(row) {
      return row.roles.map((role) =>
        h(
          NTag,
          {
            style: {
              marginRight: '6px'
            }
          },
          {
            default: () => role.name
          }
        )
      );
    }
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(
        NSpace,
        {},
        {
          default: () => [
            h(
              NButton,
              {
                size: 'small',
                onClick: () => handleEditUser(row)
              },
              { default: () => '编辑' }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: row.status === 'active' ? 'error' : 'primary',
                onClick: () => handleToggleStatus(row)
              },
              { default: () => (row.status === 'active' ? '禁用' : '启用') }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'error',
                onClick: () => handleDeleteUser(row)
              },
              { default: () => '删除' }
            )
          ]
        }
      );
    }
  }
];

const handleAddUser = () => {
  isEdit.value = false;
  Object.assign(currentUser, {
    id: 0,
    username: '',
    email: '',
    password: '',
    roles: [],
    status: 'active'
  });
  showModal.value = true;
};

const handleEditUser = (row: User) => {
  isEdit.value = true;
  Object.assign(currentUser, row);
  showModal.value = true;
};

const handleToggleStatus = async (row: User) => {
  try {
    // TODO: 调用更新用户状态API
    const action = row.status === 'active' ? '禁用' : '启用';
    message.success(`${action}成功`);
  } catch (error) {
    message.error('操作失败');
  }
};

const handleDeleteUser = async (row: User) => {
  try {
    // TODO: 调用删除用户API
    console.log(row);
    message.success('删除成功');
  } catch (error) {
    message.error('删除失败');
  }
};

const handleSaveUser = async () => {
  try {
    // TODO: 调用保存用户API
    showModal.value = false;
    message.success(isEdit.value ? '更新成功' : '创建成功');
  } catch (error) {
    message.error('保存失败');
  }
};

const handlePageChange = (page: number) => {
  pagination.page = page;
  loadUsers();
};

const loadUsers = async () => {
  try {
    // TODO: 调用获取用户列表API
  } catch (error) {
    message.error('加载用户列表失败');
  }
};

const loadRoles = async () => {
  try {
    // TODO: 调用获取角色列表API
  } catch (error) {
    message.error('加载角色列表失败');
  }
};

// 初始化数据
loadUsers();
loadRoles();
</script>

<style scoped>
.user-management {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
