import { instance } from './api';
import { ProfileType } from '../redux/types';

export const profileApi = {
    getUserProfile: async (id: number) =>
    await instance.get<ProfileType>(`profile/${id}`).then((res) => res.data),
}