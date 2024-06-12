import axios from 'axios';

const API = '/api/v1/files';

export const uploadImage = async (formData) => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
        `${API}`,
        formData,
        {
            headers:
            {
              "Authorization"   : `Bearer ${refreshToken}`
            , "Content-Type"    : "multipart/form-data"
            , "accept"          : "application/json"
            }
        }
        );
        return response.data.data;
    } catch (error) {
        console.log(error);
        console.log('error : ', error.response);
        const { status, statusText, data } = error.response;
        console.log(`${status} - ${statusText} - ${data.message}`);
        throw error;
    }
};
