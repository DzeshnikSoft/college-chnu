import { Button } from "@chakra-ui/react";
import { ButtonProps } from "@/models/ui";
export default function DeleteButton({
	children,
	className,
	onClick,
}: ButtonProps) {
	return (
		<Button colorScheme='red' className={className} onClick={onClick}>
			{children && <span className='mr-3'>{children}</span>}
			<i className='fa-solid fa-trash'></i>
		</Button>
	);
}
