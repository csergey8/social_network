import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "673f7fef-d191-4529-a605-5703216b3831"
    }
})

export const usersAPI = {
    getUsers: (currentPage: number = 1, pageSize: number = 10) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    follow: (id: number) => {
        return instance.post(`follow/${id}`)
                .then(res => res.data)
    },
    unfollow: (id: number) => {
        return instance.delete(`follow/${id}` )
                .then(res => res.data)
    },
    getUserProfile: (id: number) => {
        return instance.get(`profile/${id}`)
                .then(res => res.data)
    },
    getStatus: (id: number) => {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus: (status: string) => {
        return instance.put(`profile/status`, { status })
    },
    auth: () => {
        return instance.get('auth/me')
            .then(res => res.data)
    },
    login: (email: string, password: string, rememberMe: boolean) => {
        const body = { email, password, rememberMe }
        return instance.post('auth/login', body)
    },
    logout: () => {
        return instance.delete('auth/login')
    }
}
