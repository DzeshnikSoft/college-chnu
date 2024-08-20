import Dialog from '@/components/Dialog';
import { Formik, ErrorMessage, Form } from 'formik';
import { MemberCollectiveCollegeDto } from '@/models/api';
import { createMemberCollectiveCollegeSchema } from '@/validation/create.memberCollectiveCollege.schema';
import Edit from '@/components/Edit';
import EditTextArea from '@/components/EditTextArea';
import { Button } from '@chakra-ui/react';
import UploadFileWrapper from '@/components/UploadFileWrapper';

interface AddNewPersonProps {
	handleClose: (event: React.MouseEvent<HTMLElement>) => void;
}

function AddNewPerson({ handleClose }: AddNewPersonProps) {
	const initialNews: MemberCollectiveCollegeDto = {
		id: '',
		title: '',
		image: {
			url: '',
			alt: '',
		},
		description: '',
		index: -1,
	};

	return (
		<Dialog onClick={handleClose} className=''>
			<Formik
				initialValues={initialNews}
				validationSchema={createMemberCollectiveCollegeSchema}
				onSubmit={() => {}}>
				{({ values, isValid }) => (
					<Form>
						<div className='w-[800px] h-[500px] flex flex-col'>
							<div className='h-5/6 w-11/12 mx-auto flex justify-between'>
								<div className='w-5/12 h-full rounded-md overflow-hidden'>
									<img
										src={
											values.image.url
												? `${values.image}`
												: 'unknown_people.jpeg'
										}
										className='w-full h-full object-cover '
										alt=''
									/>
								</div>
								<div className='w-7/12 h-full ml-5 flex flex-col'>
									<div className=''>
										<Edit
											value=''
											id='title'
											name='title'
											nameInput='ПІБ'
											type='text'
											withoutButtonSave={true}
											placeholder='Введіть текст'
										/>
										<ErrorMessage
											className='text-red mb-2 text-xs'
											name='title'
											component='span'
										/>
									</div>
									<div className='mt-10'>
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
									<div className='mt-10'>
										<Edit
											value=''
											id='index'
											name='index'
											nameInput='Позиція'
											type='number'
											withoutButtonSave={true}
											placeholder='Виберіть число'
										/>
									</div>
									<div className='mt-3 w-full'>
										<UploadFileWrapper
											name='image.url'
											nameInput='Виберіть зображення'
											value=''
										/>
										<ErrorMessage
											className='text-red mb-2 text-xs'
											name='image.url'
											component='span'
										/>
									</div>
								</div>
							</div>
							<div className='h-1/6 w-11/12 mx-auto flex items-center justify-center'>
								<Button
									className='text-xl mr-10 rounded-sm bg-activeItems cursor-pointer p-2'
									onClick={handleClose}
									type='button'>
									Закрити
								</Button>
								<Button
									className='text-xl rounded-sm bg-activeItems cursor-pointer p-2'
									type='submit'
									disabled={!isValid}>
									Додати
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
}

export default AddNewPerson;
