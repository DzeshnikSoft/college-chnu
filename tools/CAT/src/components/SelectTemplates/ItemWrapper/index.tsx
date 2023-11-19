import { ReactNode } from "react";
import { Card } from "@chakra-ui/react";
interface ItemWrapperProps {
	children?: ReactNode;
	handleChangeTemplateType: (e) => void;
	type: string;
	selectedType: string;
}
export default function ItemWrapper({
	children,
	handleChangeTemplateType,
	type,
	selectedType,
}: ItemWrapperProps) {
	const handleClick = () => {
		handleChangeTemplateType(type);
	};
	return (
		<Card
			onClick={handleClick}
			className={`w-72 h-80 overflow-hidden cursor-pointer hover:scale-110 duration-100 ${
				type == selectedType && "scale-110 duration-100"
			}`}>
			{children}
		</Card>
	);
}
