const COLLEGE_API_KEY = 'COLLEGE_API_KEY';

export const apiKeyStorage = {
	get: (): string => localStorage.getItem(COLLEGE_API_KEY),
	set: (apiKey: string) => localStorage.setItem(COLLEGE_API_KEY, apiKey),
};
