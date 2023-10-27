import { IconButton } from "@chakra-ui/react";
import { BasePropsButton } from "@/models/ui";
export default function SaveButton({ onClick }: BasePropsButton) {
	return (
		<IconButton
			colorScheme='teal'
			size={"md"}
			onClick={onClick}
			aria-label='Expand menu'
			icon={<i className='fa-solid text-2xl fa-floppy-disk'></i>}
		/>
	);
}