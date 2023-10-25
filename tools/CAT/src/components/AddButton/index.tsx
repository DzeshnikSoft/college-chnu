import { BasePropsButton } from "@/models/ui";
import Button from "../Button";

export default function AddButton({
	className = "",
	onClick,
}: BasePropsButton) {
	return (
		<Button
			className={`flex bg-activeItems hover:bg-hoverActiveItems w-fit mx-auto text-white rounded-md items-center justify-center cursor-pointer px-3 ${className}`}
			onClick={onClick}>
			<i className='fa-solid fa-plus text-3xl'></i>
			<span className='text-lg ml-3'>Додати</span>
		</Button>
	);
}
