import { Formik, ErrorMessage, Form } from 'formik';
import { NewsDto } from '@/models/api';
import { updateNewsSchema } from '@/validation/update.news.schema';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import DeleteButton from '@/components/DeleteButton';
import Edit from '@/components/Edit';
import EditPageWithTitle from '../editPage/editPageWithTitle';

function EditNews() {
	const initialNews: NewsDto = {
		id: '',
		title: '',
		mainImage: '',
		description: '',
		content: '',
		pinned: null,
		date: '',
	};
	const handleSubmit = () => {};
	return (
		<div className='w-full h-full overflow-y-auto flex flex-col'>
			<Formik
				initialValues={initialNews}
				validationSchema={updateNewsSchema(null)}
				onSubmit={handleSubmit}>
				{({ values, isValid }) => (
					<Form>
						<div className='flex w-full flex-col pt-5'>
							<div className='w-11/12 mx-auto'>
								<div className='justify-between flex'>
									<Link to='/news'>
										<Button>Назад</Button>
									</Link>
									<DeleteButton>Видалити</DeleteButton>
								</div>
								<div className='w-full flex'>
									<div className='w-6/12'>
										<Edit
											value={values.title}
											id='description'
											name='description'
											nameInput='Короткий опис'
											type='text'
											withoutButtonSave={true}
										/>
										<ErrorMessage
											className='text-red mb-2 text-xs'
											name='description'
											component='span'
										/>
									</div>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default EditNews;
