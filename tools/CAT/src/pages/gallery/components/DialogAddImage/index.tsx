import Dialog from '../../../../components/Dialog';
import { Formik, ErrorMessage, Form } from 'formik';
import { Button } from '@chakra-ui/react';
import UploadFileWrapper from '@/components/UploadFileWrapper';
import EditTextArea from '@/components/EditTextArea';

interface DialogAddImageProps {
	handleClose: () => void;
}

interface ImageDataDTO {
	image: string;
}

function DialogAddImage({ handleClose }: DialogAddImageProps) {
	const initialImageData: ImageDataDTO = {
		image: '',
	};

	return (
		<Dialog onClick={handleClose} className='h-72 w-2/6'>
			<Formik
				initialValues={initialImageData}
				validationSchema={null}
				onSubmit={() => {}}>
				{(formik) => (
					<Form>
						<div className='h-full flex flex-col gap-3'>
							<div className='flex'>
								<EditTextArea
									id='description'
									name='description'
									nameInput='Короткий опис'
									placeholder='Введіть текст'
								/>
								<ErrorMessage
									className='text-red mb-4 text-xs'
									name='description'
									component='span'
								/>
							</div>
							<div className=''>
								<UploadFileWrapper
									value=''
									name='image'
									nameInput='Виберіть зображення'
								/>
								<ErrorMessage
									className='text-red mb-2 text-xs'
									name='image'
									component='span'
								/>
							</div>
							<Button
								className='text-xl rounded-sm bg-activeItems cursor-pointer p-2 mx-auto'
								type='submit'
								disabled={!formik.isValid}>
								Додати
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
}

export default DialogAddImage;
