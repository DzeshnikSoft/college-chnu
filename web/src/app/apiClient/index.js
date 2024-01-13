import axios from 'axios';

const { REACT_APP_API_URL, REACT_APP_COLLEGE_API_KEY } = process.env;

export const apiClient = axios.create({
    baseURL: REACT_APP_API_URL,
    responseType: 'json',
    headers: {
        'college-authorization': REACT_APP_COLLEGE_API_KEY,
    },
});
