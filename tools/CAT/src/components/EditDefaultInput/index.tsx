import { Input } from '@chakra-ui/react';
import { Field } from 'formik';
interface EditDefaultInputProps {
	className?: string;
	name: string;
	id: string;
	placeholder?: string;
	value: string;
}

export default function EditDefaultInput({
	name,
	id,
	placeholder,
	className = '',
	value,
}: EditDefaultInputProps) {
	return (
		<div className={`flex w-fit max-w-fit h-fit ${className}`}>
			<Field
				placeholder={placeholder}
				name={name}
				id={id}
				value={value}
				className='!border-white !bg-textColorTitlePage min-w-60 w-fit text-4xl text-white font-medium p-2'
				as={Input}
			/>
		</div>
	);
}
