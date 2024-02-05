import { Input } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

interface DatePickerProps {
	date?: string;
	name?: string;
}

function DatePicker({ date = '', name }: DatePickerProps) {
	const { setFieldValue } = useFormikContext();

	const handleChange = ({ target }) => {
		const { value } = target;
		if (value) setFieldValue(name, value);
	};

	return (
		<Input
			placeholder='Виберіть дату та час'
			size='md'
			value={date && date}
			onChange={handleChange}
			type='datetime-local'
		/>
	);
}

export default DatePicker;
