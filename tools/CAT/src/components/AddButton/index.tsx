import { BasePropsButton } from "@/models/ui";
import { Button } from "@chakra-ui/react";
export default function AddButton({
	className = "",
	onClick,
	children,
}: BasePropsButton) {
	return (
		<Button
			className={`flex !mb-0 w-fit mx-auto rounded-md items-center justify-center cursor-pointer px-3 ${className}`}
			onClick={onClick}>
			<i className='fa-solid fa-plus'></i>
			<span className='ml-3'>{children}</span>
		</Button>
	);
}
