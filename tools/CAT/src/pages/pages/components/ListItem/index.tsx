import { ReactNode, useState } from "react";

import { useDeletePageMutation } from "@/store/apis/categories";
import DeleteButton from "@/components/DeleteButton";
interface ListItemProps {
	children?: ReactNode;
	id: string;
}

export default function ListItem({ children, id }: ListItemProps) {
	const [isHovering, setIsHovering] = useState<boolean>(false);

	const [deletePage] = useDeletePageMutation();

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};
	const handleClick = () => {
		deletePage(id);
	};
	return (
		<li
			className='p-2 cursor-pointer relative border-b last:border-b-0 hover:bg-activeItems'
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}>
			{children}
			{isHovering === true && (
				<DeleteButton
					onClick={handleClick}
					className='!w-5 !h-7 !text-sm !pl-0 !pr-0 top-1/2 right-0 !absolute transform -translate-x-1/2 -translate-y-1/2'
				/>
			)}
		</li>
	);
}
