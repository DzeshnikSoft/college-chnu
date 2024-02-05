import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

interface PinRadioToggleProps {
	value: boolean;
	name: string;
}
function PinRadioToggle({ value, name }: PinRadioToggleProps) {
	const { setFieldValue } = useFormikContext();

	const handleToggle = (result) => {
		if (result === 'pin') setFieldValue(name, true);
		if (result === 'not-pin') setFieldValue(name, false);
	};

	return (
		<RadioGroup
			className='mb-3'
			onChange={handleToggle}
			value={`${value ? 'pin' : 'not-pin'}`}>
			<Stack direction='row'>
				<Radio value='pin'>Закріпити</Radio>
				<Radio value='not-pin'>Не закріплювати</Radio>
			</Stack>
		</RadioGroup>
	);
}

export default PinRadioToggle;
