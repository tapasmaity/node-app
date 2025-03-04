// import axios from 'axios';

// export default axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
//     timeout: 30000,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': localStorage.getItem('token')
//     }
// });
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add the Authorization header dynamically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
