<template>
  <div class="permission-management">
    <n-card>
      <template #header>
        <div class="card-header">
          <span>权限管理</span>
          <n-button type="primary" @click="handleAddPermission">
            新增权限
          </n-button>
        </div>
      </template>

      <n-data-table
        :columns="columns"
        :data="permissions"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </n-card>

    <n-modal
      v-model:show="showModal"
      :title="isEdit ? '编辑权限' : '新增权限'"
      preset="card"
      style="width: 500px"
    >
      <n-form
        ref="formRef"
        :model="currentPermission"
        :rules="rules"
        label-placement="left"
        label-width="80"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="权限名称" path="name">
          <n-input v-model:value="currentPermission.name" placeholder="请输入权限名称" />
        </n-form-item>
        <n-form-item label="权限编码" path="code">
          <n-input v-model:value="currentPermission.code" placeholder="请输入权限编码" />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input
            v-model:value="currentPermission.description"
            type="textarea"
            placeholder="请输入权限描述"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" @click="handleSavePermission">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { h, ref, reactive } from 'vue';
import type { Permission } from '@/types/permission';
import { NButton, NSpace, useMessage } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';

const message = useMessage();
const permissions = ref<Permission[]>([]);
const showModal = ref(false);
const isEdit = ref(false);
const formRef = ref(null);

const currentPermission = reactive<Permission>({
  id: 0,
  name: '',
  code: '',
  description: ''
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
    message: '请输入权限名称',
    trigger: 'blur'
  },
  code: {
    required: true,
    message: '请输入权限编码',
    trigger: 'blur'
  }
};

const columns: DataTableColumns<Permission> = [
  {
    title: '权限名称',
    key: 'name'
  },
  {
    title: '权限编码',
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
                onClick: () => handleEditPermission(row)
              },
              { default: () => '编辑' }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'error',
                onClick: () => handleDeletePermission(row)
              },
              { default: () => '删除' }
            )
          ]
        }
      );
    }
  }
];

const handleAddPermission = () => {
  isEdit.value = false;
  Object.assign(currentPermission, {
    id: 0,
    name: '',
    code: '',
    description: ''
  });
  showModal.value = true;
};

const handleEditPermission = (row: Permission) => {
  isEdit.value = true;
  Object.assign(currentPermission, row);
  showModal.value = true;
};

const handleDeletePermission = async (row: Permission) => {
  try {
    // TODO: 调用删除权限API
    message.success('删除成功');
  } catch (error) {
    message.error('删除失败');
  }
};

const handleSavePermission = async () => {
  try {
    // TODO: 调用保存权限API
    showModal.value = false;
    message.success(isEdit.value ? '更新成功' : '创建成功');
  } catch (error) {
    message.error('保存失败');
  }
};

const handlePageChange = (page: number) => {
  pagination.page = page;
  loadPermissions();
};

const loadPermissions = async () => {
  try {
    // TODO: 调用获取权限列表API
  } catch (error) {
    message.error('加载权限列表失败');
  }
};

// 初始化数据
loadPermissions();
</script>

<style scoped>
.permission-management {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
