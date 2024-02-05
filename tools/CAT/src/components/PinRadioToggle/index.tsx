import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

enum PinStatus {
	Pin = 'pin',
	NotPin = 'not-pin',
}

interface PinRadioToggleProps {
	value: boolean;
	name: string;
}

function PinRadioToggle({ value, name }: PinRadioToggleProps) {
	const { setFieldValue } = useFormikContext();

	const handleToggle = (status: PinStatus) => {
		setFieldValue(name, status === PinStatus.Pin);
	};

	return (
		<RadioGroup
			className='mb-3'
			onChange={handleToggle}
			value={value ? PinStatus.Pin : PinStatus.NotPin}>
			<Stack direction='row'>
				<Radio value={PinStatus.Pin}>Закріпити</Radio>
				<Radio value={PinStatus.NotPin}>Не закріплювати</Radio>
			</Stack>
		</RadioGroup>
	);
}

export default PinRadioToggle;
