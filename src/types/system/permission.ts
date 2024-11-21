export interface Permission {
  id: number;
  name: string;
  code: string;
  description?: string;
}

export interface Role {
  id: number;
  name: string;
  code: string;
  permissions: Permission[];
  description?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: number;
  name: string;
  path: string;
  icon?: string;
  component?: string;
  permissions?: string[];
  children?: MenuItem[];
  sort?: number;
  hidden?: boolean;
}
