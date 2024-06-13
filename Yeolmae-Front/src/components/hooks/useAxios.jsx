import { useState, useEffect } from 'react';
import axios from 'axios';
// clone 'https://dev.to/hey_yogini/useaxios-a-simple-custom-hook-for-calling-apis-using-axios-2dkj#final-code'

axios.defaults.baseURL = 'https://13.124.45.191:8080'
const appendURL = '/api/v1/users';

const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        axios
        .get(appendURL)
        .then((res) => {
            setResponse(res.data);
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setloading(false);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { response, error, loading };

};

export default useAxios;