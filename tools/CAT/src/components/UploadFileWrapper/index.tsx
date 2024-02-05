import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { InputGroup, InputLeftAddon } from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';
import SpinnerWrapper from '../Spinner';
import uploadFile from '@/store/apis/uploadFile';
import { useFormikContext } from 'formik';

interface UploadFileWrapperProps {
	nameInput: string;
	name: string;
	value: string;
}

export default function UploadFileWrapper({
	name,
	nameInput,
	value,
}: UploadFileWrapperProps) {
	const { setFieldValue } = useFormikContext();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [url, setUrl] = useState<string>(value);
	const [fileName, setFileName] = useState<string>('');
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

	useEffect(() => {
		if (selectedFile) handleUpload();
	}, [selectedFile]);

	const handleUpload = async () => {
		setUrl(await uploadFile(selectedFile, setLoading));
	};

	useEffect(() => {
		setFieldValue(`${name}`, url);
	}, [url]);

	return (
		<div className='flex '>
			<div className='flex flex-col justify-between'>
				<div className='flex'>
					<InputGroup>
						<InputLeftAddon children={nameInput} />
						<label>
							<input
								ref={fileInputRef}
								className='hidden'
								type='file'
								onChange={handleFileChange}
							/>
						</label>
						{loading ? (
							<SpinnerWrapper />
						) : (
							<span
								className='border whitespace-nowrap bg-white overflow-x-auto rounded-md relative w-72 overflow-hidden rounded-l-none flex justify-center items-center px-3 pl-5 my-auto h-10'
								ref={urlRef}>
								{url ? url : 'Виберіть файл'}
							</span>
						)}
						<Button
							onClick={handleButtonClick}
							className='!w-fit !h-full m-auto ml-3'>
							<i className='fa-solid fa-file-arrow-up text-2xl'></i>
						</Button>
					</InputGroup>
				</div>
			</div>
		</div>
	);
}
