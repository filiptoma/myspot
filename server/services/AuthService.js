import axios from 'axios'

class AuthService {
    static registerUser({ username, email, password }) {
        return axios.post('/api/auth/register', {
            username, email, password
        }, { withCredentials: true })
    }

    static loginUser({ username, password }) {
        return axios.post('/api/auth/login', {
            username, password
        }, { withCredentials: true })
    }

    static logoutUser() {
        return axios.post('/api/auth/logout',
        { withCredentials: true })
    }
}

export default AuthService