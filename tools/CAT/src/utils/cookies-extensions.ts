const COLLEGE_API_KEY = 'college_api_key';

export const getCookieApiKey = (): string | null => {
	return getCookies(COLLEGE_API_KEY);
};

export const getCookies = (key: string): string | null => {
	var b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
	return b ? b.pop() : '';
};
