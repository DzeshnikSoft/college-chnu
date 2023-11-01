import { Button } from "@chakra-ui/react";
import { BasePropsButton } from "@/models/ui";
export default function SaveButton({
	onClick,
	className = "",
}: BasePropsButton) {
	return (
		<Button onClick={onClick} className={className}>
			<i className='fa-solid text-2xl fa-floppy-disk'></i>
		</Button>
	);
}
