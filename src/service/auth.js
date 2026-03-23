import api from './axios';

export async function login({ userCode, password }) {
    try {
        const res = await api.post('/auth/login', { userCode, password });
        if (res.token) {
            localStorage.setItem('token', res.token)
        }
    } catch (error) {
        throw new Error('Sai tài khoản hoặc mật khẩu')
    }
}

export async function logout() {
    try {
        await api.post('/auth/logout');
        localStorage.removeItem('token')
    } catch (error) {
        console.log('Error: ', error)
    }
}