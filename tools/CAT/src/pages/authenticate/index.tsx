import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';

import { CollegeAdmin } from '@/models/college-admin';
import { showErrorNotif, showSuccessNotif } from '@/providers/notify';
import { apiKeyStorage } from '@/services/localStorageService';
import { useLoginMutation } from '@/store/apis/login';
import { loginValidationSchema } from '@/validation/login.schema';
import { Button, Input } from '@chakra-ui/react';

const Authenticate = () => {
	const [login, { data, error, isLoading }] = useLoginMutation();

	const handleLogin = async (values: CollegeAdmin) => {
		login(values);
	};

	const initialValues: CollegeAdmin = {
		login: '',
		password: '',
	};

	useEffect(() => {
		if (error) {
			if (error?.status === 400) {
				showErrorNotif('Неправильний логін або пароль :(');
			} else {
				showErrorNotif('Щось пішло не по плану :(');
			}
		}
	}, [error]);

	useEffect(() => {
		if (data) {
			showSuccessNotif('Ласкаво просимо назад');
			apiKeyStorage.set(data.apiKey);
			// TODO: Add navigation to dashboard
		}
	}, [data]);

	return (
		<div className='h-screen flex'>
			<Formik
				initialValues={initialValues}
				validationSchema={loginValidationSchema}
				onSubmit={handleLogin}
			>
				{(formik) => (
					<Form className='w-1/3 m-auto p-2 flex flex-col'>
						<h2 className='text-3xl text-center mb-10'>
							Ласкаво просимо адміністраторе
						</h2>
						<div>
							<Field type='text' id='login' name='login' as={Input} />
							<ErrorMessage
								className='text-red mb-2 text-xs'
								name='login'
								component='span'
							/>
						</div>
						<div className='my-6'>
							<Field type='password' id='password' name='password' as={Input} />
							<ErrorMessage
								className='text-red mb-2 text-xs'
								name='password'
								component='span'
							/>
						</div>
						<Button
							isLoading={isLoading}
							loadingText='Обробляється'
							type='submit'
							disabled={!formik.isValid}
						>
							Увійти
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Authenticate;
