import Button from "../Button";
import { BasePropsButton } from "@/models/ui";
export default function CloseButton({
	className = "",
	onClick,
}: BasePropsButton) {
	return (
		<Button
			onClick={onClick}
			className={`text-red z-30 bg-transparent hover:bg-transparent ml-auto ${className}`}>
			<i className='hover:text-[#940A0A] hover:scale-110 duration-100 fa-solid fa-xmark'></i>
		</Button>
	);
}
