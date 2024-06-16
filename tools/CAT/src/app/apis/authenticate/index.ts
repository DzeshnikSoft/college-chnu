import { CollegeAdmin } from '@/models/college-admin';
import { showErrorNotif, showSuccessNotif } from '@/providers/notify';

export const login = async (userData: CollegeAdmin, navigate) => {
	if (
		userData.login === import.meta.env.VITE_ADMIN_LOGIN &&
		userData.password === import.meta.env.VITE_ADMIN_PASSWORD
	) {
		localStorage.setItem('status', 'admin');
		showSuccessNotif('Ласкаво просимо');
		navigate('/');
	} else {
		showErrorNotif('Неправильний логін або пароль');
	}
};

export const isAuthenticated = () => {
	return localStorage.getItem('status') === 'admin';
};

export const logout = () => {
	localStorage.removeItem('status');
};
