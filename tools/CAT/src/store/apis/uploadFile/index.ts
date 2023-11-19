const uploadFile = async (selectedFile, setLoading, setFileUrl) => {
	setLoading(true);

	const formData = new FormData();
	formData.append("file", selectedFile);
	formData.append("fileName", selectedFile.name);

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/files`, {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const result = await response.text();
			setFileUrl(result);
		} else {
			console.error("Error: ", response.status, response.statusText);
		}
	} catch (error) {
		console.error("An error occurred while sending the file:", error);
	} finally {
		setLoading(false);
	}
};

export default uploadFile;
