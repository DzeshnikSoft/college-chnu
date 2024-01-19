import { ReactNode } from 'react';
import { Card } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

interface ItemWrapperProps {
	children?: ReactNode;
	type: number;
	selectedTypeState: number;
	handleChangeType: (e) => void;
}

export default function ItemWrapper({
	children,
	type,
	selectedTypeState,
	handleChangeType,
}: ItemWrapperProps) {
	const { setFieldValue } = useFormikContext();

	const handleClick = () => {
		setFieldValue('template.type', type);
		handleChangeType(type);
	};

	return (
		<Card
			onClick={handleClick}
			className={`w-72 h-80 overflow-hidden cursor-pointer hover:scale-110 duration-100 ${
				type == selectedTypeState && 'scale-110 duration-100'
			}`}>
			{children}
		</Card>
	);
}
