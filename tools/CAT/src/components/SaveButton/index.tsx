import { IconButton } from "@chakra-ui/react";
export default function SaveButton({ onClick }) {
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
