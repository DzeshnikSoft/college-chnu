import { Button } from "@chakra-ui/react";
import { ButtonProps } from "@/models/ui";
export default function SaveButton({ onClick, className = "" }: ButtonProps) {
	return (
		<Button onClick={onClick} className={className}>
			<i className='fa-solid text-2xl fa-floppy-disk'></i>
		</Button>
	);
}
