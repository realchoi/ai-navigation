import http from "@/utils/request";

// 定义接口响应类型
interface UserInfo {
  id: string | number;
  identityType: number;
  identifier: string;
  userName: string;
  nickName: string;
  avatar: string;
  // 其他用户信息字段
}

interface LoginResponse {
  accessToken: string;
  userInfo: UserInfo;
}

interface RegisterResponse {
  token: string;
  userInfo: UserInfo;
}

// 登录请求参数类型
interface LoginParams {
  identityType: number;
  identifier: string;
  credential: string;
  rememberMe?: boolean;
}

// 注册请求参数类型
interface RegisterParams {
  identityType: number;
  identifier: string;
  nickName: string;
  credential: string;
  // 其他注册所需字段
}

/**
 * 用户登录
 * @param params - 登录参数
 * @returns 登录结果
 */
export function login(params: LoginParams): Promise<LoginResponse> {
  return http.post<LoginResponse>("/account/login", params);
}

/**
 * 用户注册
 * @param params - 注册参数
 * @returns 注册结果
 */
export function register(params: RegisterParams): Promise<RegisterResponse> {
  return http.post<RegisterResponse>("/account/register", params);
}

/**
 * 退出登录
 */
export function logout(): Promise<void> {
  return http.post("/account/logout");
}

/**
 * 获取当前用户信息
 * @returns 用户信息
 */
export function getUserInfo(): Promise<UserInfo> {
  return http.get<UserInfo>("/account/user-info");
}
