import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';


export default refreshToken() {
    const API = 'api/v1/login';
    const navigate = useNavigate();
    useEffect(() => {
        const refresh = axios.create(
            '${API}/reissue', 
        )
    });

    const interceptor = axios.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
            if (error.reponse.status === 401) {
                console.log('토큰 재발급');
                await axios.post(`${API}/reissue`, { 
                    headers: {
                        refreshToken: localStorage.getItem('refreshToken'),
                        
                    }
                })
            }
        }
    )
    try {
        const response = await axios.post(`${API}/reissue`, { 
            headers: {
                refreshToken: localStorage.getItem('refreshToken')
            }
        })
    } catch
};
