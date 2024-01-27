import axios, { AxiosInstance } from 'axios';

interface ApiClientConfig {
	baseURL: string;
	responseType: 'json';
}

export const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string,
	responseType: 'json',
	headers: {
		'college-authorization': import.meta.env
			.VITE_APP_COLLEGE_API_KEY as string,
	},
} as ApiClientConfig);
