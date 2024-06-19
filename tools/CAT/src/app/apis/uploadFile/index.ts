import { apiClient } from '@/app/apiClient';
import { showErrorNotif } from '@/providers/notify';
import { getErrorMessage } from '@/factories/errorMessage.factory';

const uploadFile = async (selectedFile, setLoading) => {
	setLoading(true);
	const formData = new FormData();
	formData.append('file', selectedFile);
	formData.append('fileName', selectedFile.name);
	try {
		const response = await apiClient.post(
			`${import.meta.env.VITE_UPLOAD_FILE_URL}`,
			formData
		);
		return response.data;
	} catch (error) {
		const { data } = error.response;
		showErrorNotif(getErrorMessage(data) || 'Упс, щось пішло не так');
	} finally {
		setLoading(false);
	}
};

export default uploadFile;
