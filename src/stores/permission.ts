import { defineStore } from 'pinia';
import type { User, MenuItem } from '#/system/permission';

interface PermissionState {
  currentUser: User | null;
  permissions: Set<string>;
  roles: Set<string>;
  menus: MenuItem[];
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    currentUser: null,
    permissions: new Set(),
    roles: new Set(),
    menus: []
  }),

  getters: {
    hasPermission: (state) => (permission: string) => state.permissions.has(permission),
    hasRole: (state) => (role: string) => state.roles.has(role),
    getMenus: (state) => state.menus,
  },

  actions: {
    setUser(user: User) {
      this.currentUser = user;
      this.roles = new Set(user.roles.map(role => role.code));
      const permissions = new Set<string>();
      user.roles.forEach(role => {
        role.permissions.forEach(permission => {
          permissions.add(permission.code);
        });
      });
      this.permissions = permissions;
    },

    setMenus(menus: MenuItem[]) {
      const filterMenus = (items: MenuItem[]): MenuItem[] => {
        return items.filter(item => {
          if (item.permissions && item.permissions.length > 0) {
            return item.permissions.some(permission => this.permissions.has(permission));
          }
          if (item.children) {
            item.children = filterMenus(item.children);
            return item.children.length > 0;
          }
          return true;
        });
      };

      this.menus = filterMenus(menus);
    },

    clearPermissions() {
      this.currentUser = null;
      this.permissions.clear();
      this.roles.clear();
      this.menus = [];
    }
  }
});
