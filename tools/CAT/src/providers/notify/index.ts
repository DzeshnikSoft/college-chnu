import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastOptions } from 'react-toastify';

export const showSuccessNotif = (message: string): void => {
	showSuccess(message);
};

export const showErrorNotif = (message: string): void => {
	showError(message);
};

const showSuccess = (message: string, autoClose = 4000): void => {
	toast.success(message, { ...defaultToastOptions, autoClose });
};

const showError = (message: string, autoClose = 4000): void => {
	toast.error(message, { ...defaultToastOptions, autoClose });
};

const defaultToastOptions: ToastOptions = {
	position: 'top-right',
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'light',
};
