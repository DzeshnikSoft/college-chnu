import { useState, useEffect, ChangeEvent } from 'react';
import { useRef } from 'react';
import { Button } from '@chakra-ui/react';
import SpinnerWrapper from '../Spinner';
import uploadFile from '@/store/apis/uploadFile';

export default function UploadFileWrapper() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileUrl, setFileUrl] = useState<string>('');
	const [fileName, setFileName] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const urlRef = useRef<HTMLInputElement | null>(null);
	const fileInputRef = useRef(null);

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			setSelectedFile(file);
			setFileName(file.name);
		}
	};

	const handleCopyClick = () => {
		if (urlRef.current) {
			navigator.clipboard.writeText(urlRef.current.textContent);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await uploadFile(selectedFile, setLoading, setFileUrl);
	};

	return (
		<form onSubmit={handleSubmit} className='flex '>
			<div className='flex flex-col justify-between'>
				<div className=''>
					<label>
						Виберіть файл:
						<input
							ref={fileInputRef}
							className='ml-2 hidden'
							type='file'
							onChange={handleFileChange}
						/>
					</label>
					<Button
						onClick={handleButtonClick}
						className='!w-fit !h-fit !p-[1px] ml-3'>
						<i className='fa-solid fa-file-arrow-up text-2xl'></i>
					</Button>
				</div>
				<span>{fileName ? fileName : 'Файл не вибрано'}</span>
				<Button className='w-fit mt-1' type='submit'>
					Завантажити та отримати посилання
				</Button>
			</div>
			{loading ? (
				<SpinnerWrapper />
			) : (
				fileUrl && (
					<span
						className='border rounded-md relative w-6/12 ml-8 h-fit my-auto p-2'
						ref={urlRef}>
						{fileUrl}
						<Button
							onClick={handleCopyClick}
							className='!absolute top-2 right-2'>
							<i className='fa-solid fa-copy text-2xl'></i>
						</Button>
					</span>
				)
			)}
		</form>
	);
}
