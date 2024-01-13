import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

export const apiClient = axios.create({
    baseURL: REACT_APP_API_URL,
    responseType: 'json',
    headers: {
        'college-authorization': 'b0c7793e7f3e4ca8973dcef8f1b5f096',
    },
});
