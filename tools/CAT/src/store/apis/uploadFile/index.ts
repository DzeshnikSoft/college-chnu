import { apiClient } from '@/app/apiClient';
import { showErrorNotif } from '@/providers/notify';
import { getErrorMessage } from '@/factories/errorMessage.factory';

const uploadFile = async (selectedFile, setLoading) => {
	setLoading(true);
	const formData = new FormData();
	formData.append('file', selectedFile);
	formData.append('fileName', selectedFile.name);
	try {
		// const response = await apiClient.post('files', formData);
		// const { data } = response;
		return 'https://fmi.chnu.edu.ua/media/kcegr3ix/matfak-plusblack43.jpg?cc=0,0.072520908468213,0,0.16990333395602947&width=1920&height=832&quality=80';
	} catch (error) {
		const { data } = error.response;
		showErrorNotif(getErrorMessage(data) || 'Упс, щось пішло не так');
	} finally {
		setLoading(false);
	}
};

export default uploadFile;
