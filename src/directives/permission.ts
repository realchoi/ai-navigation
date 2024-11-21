import type { Directive, DirectiveBinding } from 'vue';
import { usePermissionStore } from '../stores/permission';

export const vPermission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const permissionStore = usePermissionStore();

    if (value && value.length > 0) {
      const hasPermission = value.some((permission: string) => 
        permissionStore.hasPermission(permission)
      );

      if (!hasPermission) {
        el.parentNode?.removeChild(el);
      }
    }
  }
};

export const vRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const permissionStore = usePermissionStore();

    if (value && value.length > 0) {
      const hasRole = value.some((role: string) => 
        permissionStore.hasRole(role)
      );

      if (!hasRole) {
        el.parentNode?.removeChild(el);
      }
    }
  }
};
