import axios from 'axios';

const { REACT_APP_API_URL, REACT_APP_COLLEGE_API_KEY } = process.env;

export const apiClient = axios.create({
	baseURL: REACT_APP_API_URL,
	responseType: 'json',
	timeout: 50000,
	headers: {
		'college-authorization': REACT_APP_COLLEGE_API_KEY,
	},
});
