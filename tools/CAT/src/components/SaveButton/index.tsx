import { Button } from '@chakra-ui/react';
import { ButtonProps } from '@/models/ui';
export default function SaveButton({
	onClick,
	className = '',
	disabled,
}: ButtonProps) {
	return (
		<Button
			type='submit'
			onClick={onClick}
			className={className}
			disabled={disabled}>
			<i className='fa-solid text-2xl fa-floppy-disk'></i>
		</Button>
	);
}
