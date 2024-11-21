<template>
  <div class="role-management">
    <n-card>
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <n-button type="primary" @click="handleAddRole">新增角色</n-button>
        </div>
      </template>

      <n-data-table
        :columns="columns"
        :data="roles"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </n-card>

    <n-modal
      v-model:show="showModal"
      :title="isEdit ? '编辑角色' : '新增角色'"
      preset="card"
      style="width: 600px"
    >
      <n-form
        ref="formRef"
        :model="currentRole"
        :rules="rules"
        label-placement="left"
        label-width="80"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="角色名称" path="name">
          <n-input v-model:value="currentRole.name" placeholder="请输入角色名称" />
        </n-form-item>
        <n-form-item label="角色编码" path="code">
          <n-input v-model:value="currentRole.code" placeholder="请输入角色编码" />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input
            v-model:value="currentRole.description"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </n-form-item>
        <n-form-item label="权限" path="permissions">
          <n-tree
            v-model:checked-keys="currentRole.permissions"
            :data="permissionTree"
            cascade
            checkable
            :check-strategy="'child'"
            key-field="id"
            label-field="name"
            :selectable="false"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" @click="handleSaveRole">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { h, ref, reactive } from 'vue';
import type { Role, Permission } from '@/types/permission';
import { NButton, NSpace, useMessage } from 'naive-ui';
import type { DataTableColumns, TreeOption } from 'naive-ui';

const message = useMessage();
const roles = ref<Role[]>([]);
const permissionTree = ref<TreeOption[]>([]);
const showModal = ref(false);
const isEdit = ref(false);
const formRef = ref(null);

const currentRole = reactive<Role>({
  id: 0,
  name: '',
  code: '',
  description: '',
  permissions: []
});

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40]
});

const rules = {
  name: {
    required: true,
    message: '请输入角色名称',
    trigger: 'blur'
  },
  code: {
    required: true,
    message: '请输入角色编码',
    trigger: 'blur'
  }
};

const columns: DataTableColumns<Role> = [
  {
    title: '角色名称',
    key: 'name'
  },
  {
    title: '角色编码',
    key: 'code'
  },
  {
    title: '描述',
    key: 'description'
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
                onClick: () => handleEditRole(row)
              },
              { default: () => '编辑' }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'error',
                onClick: () => handleDeleteRole(row)
              },
              { default: () => '删除' }
            )
          ]
        }
      );
    }
  }
];

const handleAddRole = () => {
  isEdit.value = false;
  Object.assign(currentRole, {
    id: 0,
    name: '',
    code: '',
    description: '',
    permissions: []
  });
  showModal.value = true;
};

const handleEditRole = (row: Role) => {
  isEdit.value = true;
  Object.assign(currentRole, row);
  showModal.value = true;
};

const handleDeleteRole = async (row: Role) => {
  try {
    // TODO: 调用删除角色API
    message.success('删除成功');
  } catch (error) {
    message.error('删除失败');
  }
};

const handleSaveRole = async () => {
  try {
    // TODO: 调用保存角色API
    showModal.value = false;
    message.success(isEdit.value ? '更新成功' : '创建成功');
  } catch (error) {
    message.error('保存失败');
  }
};

const handlePageChange = (page: number) => {
  pagination.page = page;
  loadRoles();
};

const loadRoles = async () => {
  try {
    // TODO: 调用获取角色列表API
  } catch (error) {
    message.error('加载角色列表失败');
  }
};

const loadPermissionTree = async () => {
  try {
    // TODO: 调用获取权限树API
  } catch (error) {
    message.error('加载权限树失败');
  }
};

// 初始化数据
loadRoles();
loadPermissionTree();
</script>

<style scoped>
.role-management {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
