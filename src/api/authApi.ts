import { instance, ResponseType, ResultCodeEnum } from "./api";

export type MeResponseType = {
    data: AuthDataType
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export type LoginResonseDataType = {
    userId: number
}

export type AuthDataType = {
    id: number,
    email: string,
    login: string
}

export type AuthLoginType = {
    data: { 
        userId: number
    },
    resultCode: ResultCodeEnum,
    messages: Array<string>
}

export const authApi = {
    auth: async () => instance.get<ResponseType<AuthDataType>>("auth/me").then((res) => res.data),
    login: async (email: string, password: string, rememberMe: boolean) => {
      const body = { email, password, rememberMe };
      return await instance.post<ResponseType<LoginResonseDataType>>("auth/login", body);
    },
    logout: async () => instance.delete("auth/login"),
 }