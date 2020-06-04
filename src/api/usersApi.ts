import { instance, GetItemsType, ResponseType } from './api';



export const usersApi = {
  getUsers: async (currentPage: number = 1, pageSize: number = 10) =>
    await instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data),
  follow: async (id: number) =>
    await instance.post<ResponseType>(`follow/${id}`).then(res => res.data),
  unfollow: async (id: number) =>
    instance.delete(`follow/${id}`).then(res => res.data) as Promise<ResponseType>
};
