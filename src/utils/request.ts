import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { createDiscreteApi } from 'naive-ui';
import router from '@/router';

// 定义响应数据接口
interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 创建naive-ui的消息API
const { message } = createDiscreteApi(['message']);

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // 在发送请求前处理请求配置
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    message.error('请求发送失败');
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse): any => {
    const res = response.data as ApiResponse;
    
    // 假设API返回格式为 { code: number, data: any, message: string }
    if (res.code !== 0 && res.code !== 200) {
      message.error(res.message || '请求失败');
      
      // 处理特定错误码
      if (res.code === 401) {
        // 未授权处理
        router.push('/login');
      }
      
      return Promise.reject(new Error(res.message || '未知错误'));
    }
    
    return res.data || res;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      const { status, data } = error.response as AxiosResponse<ApiResponse>;
      
      // 处理不同HTTP状态码
      switch (status) {
        case 400:
          message.error((data as ApiResponse).message || '请求参数错误');
          break;
        case 401:
          message.error('登录已过期，请重新登录');
          break;
        case 403:
          message.error('没有权限访问该资源');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器错误，请联系管理员');
          break;
        default:
          message.error(`请求失败(${status})`);
      }
    } else if (error.request) {
      // 请求已发送但无响应
      message.error('服务器无响应，请检查网络连接');
    } else {
      // 其他错误
      message.error('请求错误: ' + error.message);
    }
    
    return Promise.reject(error);
  }
);

// API请求方法类型定义
interface Http {
  get<T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T>;
  upload<T = any>(url: string, file: File | FormData, config?: AxiosRequestConfig): Promise<T>;
  download(url: string, params?: Record<string, any>, filename?: string, config?: AxiosRequestConfig): Promise<void>;
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
}

// API请求方法封装
const http: Http = {
  /**
   * GET请求
   * @param url - 请求地址
   * @param params - 请求参数（URL参数）
   * @param config - 额外配置
   */
  get<T = any>(url: string, params: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return request({
      method: 'get',
      url,
      params,
      ...config
    });
  },
  
  /**
   * POST请求
   * @param url - 请求地址
   * @param data - 请求体数据
   * @param config - 额外配置
   */
  post<T = any>(url: string, data: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return request({
      method: 'post',
      url,
      data,
      ...config
    });
  },
  
  /**
   * PUT请求
   * @param url - 请求地址
   * @param data - 请求体数据
   * @param config - 额外配置
   */
  put<T = any>(url: string, data: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return request({
      method: 'put',
      url,
      data,
      ...config
    });
  },
  
  /**
   * DELETE请求
   * @param url - 请求地址
   * @param params - 请求参数（URL参数）
   * @param config - 额外配置
   */
  delete<T = any>(url: string, params: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return request({
      method: 'delete',
      url,
      params,
      ...config
    });
  },
  
  /**
   * PATCH请求
   * @param url - 请求地址
   * @param data - 请求体数据
   * @param config - 额外配置
   */
  patch<T = any>(url: string, data: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return request({
      method: 'patch',
      url,
      data,
      ...config
    });
  },
  
  /**
   * 文件上传
   * @param url - 上传地址
   * @param file - 文件对象或FormData
   * @param config - 额外配置
   */
  upload<T = any>(url: string, file: File | FormData, config: AxiosRequestConfig = {}): Promise<T> {
    const formData = file instanceof FormData ? file : new FormData();
    
    if (!(file instanceof FormData)) {
      formData.append('file', file);
    }
    
    return request({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    });
  },
  
  /**
   * 文件下载
   * @param url - 下载地址
   * @param params - 请求参数
   * @param filename - 下载文件名
   * @param config - 额外配置
   */
  download(url: string, params: Record<string, any> = {}, filename?: string, config: AxiosRequestConfig = {}): Promise<void> {
    return request({
      method: 'get',
      url,
      params,
      responseType: 'blob',
      ...config
    }).then(response => {
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      const blobURL = window.URL.createObjectURL(blob);
      
      link.href = blobURL;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobURL);
    });
  },
  
  /**
   * 原始请求方法，用于自定义请求
   * @param config - axios配置对象
   */
  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return request(config);
  }
};

export default http; 