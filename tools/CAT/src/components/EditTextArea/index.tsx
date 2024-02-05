import { InputGroup, InputLeftAddon, Textarea } from '@chakra-ui/react';
import { Field } from 'formik';

interface EditProps {
	name: string;
	nameInput: string;
	id: string;
	placeholder?: string;
}

export default function EditTextArea({
	name,
	id,
	nameInput,
	placeholder = '',
}: EditProps) {
	return (
		<div className='w-full h-full flex flex-col'>
			<InputGroup className='h-fit flex'>
				<InputLeftAddon className='!h-full flex' children={nameInput} />
				<Field
					type='text'
					name={name}
					className='!rounded-none'
					placeholder={placeholder}
					id={id}
					as={Textarea}
				/>
			</InputGroup>
		</div>
	);
}
