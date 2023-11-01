import { ReactNode } from "react";
import CloseButton from "../CloseButton";
interface StateDialog {
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	children?: ReactNode;
}

export default function Dialog({
	children,
	className = "",
	onClick,
}: StateDialog) {
	return (
		<div
			onClick={onClick}
			className='w-screen bg-black/20 z-50 h-screen fixed top-0 left-0 flex'>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`rounded-md relative m-auto z-50 bg-white p-5 w-fit h-fit flex ${className}`}>
				<CloseButton
					className='absolute top-0.5 right-0.5'
					onClick={onClick}
				/>
				{children}
			</div>
		</div>
	);
}
