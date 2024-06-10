import Dialog from '@/components/Dialog';
import { Formik, ErrorMessage, Form } from 'formik';

interface AddNewPersonProps {
	handleClose: (event: React.MouseEvent<HTMLElement>) => void;
}

function AddNewPerson({ handleClose }: AddNewPersonProps) {
	return (
		<Dialog onClick={handleClose} className=''>
			<div className='w-[800px] h-[500px] flex flex-col'>
				<div className='h-5/6'></div>
				<div className='1/6'></div>
			</div>
		</Dialog>
	);
}

export default AddNewPerson;
