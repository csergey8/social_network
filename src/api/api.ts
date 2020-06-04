import axios from 'axios';
import { UserType } from '../redux/types';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "673f7fef-d191-4529-a605-5703216b3831"
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export type AuthType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodeEnum,
    messages: Array<string>
}

export type AuthLoginType = {
    data: { 
        userId: number
    },
    resultCode: ResultCodeEnum,
    messages: Array<string>
}

export type GetItemsType = {
  items: UserType[]
  totalCount: number
  error: string | null
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}

export const usersAPI = {
  getUsers: async (currentPage: number = 1, pageSize: number = 10) =>
    await instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data),
  follow: async (id: number) =>
    await instance.post(`follow/${id}`).then((res) => res.data),
  unfollow: async (id: number) =>
    instance.delete(`follow/${id}`).then((res) => res.data),
  getUserProfile: async (id: number) =>
    await instance.get(`profile/${id}`).then((res) => res.data),
  getStatus: async (id: number) => await instance.get(`profile/status/${id}`),
  updateStatus: async (status: string) =>
    await instance.put(`profile/status`, { status }),
  auth: async () => instance.get<AuthType>("auth/me").then((res) => res.data),
  login: async (email: string, password: string, rememberMe: boolean) => {
    const body = { email, password, rememberMe };
    return await instance.post<AuthLoginType>("auth/login", body);
  },
  logout: async () => instance.delete("auth/login"),
};
