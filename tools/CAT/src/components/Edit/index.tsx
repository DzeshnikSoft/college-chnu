import { useState, useEffect } from 'react';
import SaveButton from '../SaveButton';
import {
	InputGroup,
	InputLeftAddon,
	Input,
	InputRightAddon,
} from '@chakra-ui/react';
import { Field } from 'formik';

interface EditProps {
	name: string;
	nameInput: string;
	id: string;
	value: string;
	placeholder?: string;
	type: string;
	withoutButtonSave?: boolean;
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	formValues?: { [key: string]: any };
}

export default function Edit({
	name,
	onClick,
	value = '',
	id,
	nameInput,
	placeholder = '',
	type = '',
	withoutButtonSave = false,
	disabled,
	formValues = null,
}: EditProps) {
	const [isShowButton, setIsShowButton] = useState<boolean>(false);

	useEffect(() => {
		!withoutButtonSave && setIsShowButton(formValues[name] !== value);
	}, [formValues, name]);

	return (
		<div className='w-full flex flex-col'>
			<InputGroup>
				<InputLeftAddon children={nameInput} />
				<Field
					type='text'
					name={name}
					className='!rounded-none'
					placeholder={placeholder}
					id={id}
					as={Input}
				/>

				{type === 'link' && <InputRightAddon children='.com' />}

				{!withoutButtonSave && isShowButton && (
					<SaveButton
						onClick={onClick}
						className='ml-4'
						disabled={disabled}
					/>
				)}
			</InputGroup>
		</div>
	);
}
