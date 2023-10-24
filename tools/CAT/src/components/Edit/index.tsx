import { useState } from "react";
import SaveButton from "../SaveButton";
import TextField from "../TextField";
import Button from "@/components/Button";

export default function Edit({ title, onChange = null, onClick = null }) {
	const [isHovering, setIsHovering] = useState<boolean>(false);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	const handleOnShowMode = () => {
		setIsEditMode(true);
	};

	const handleOffShowMode = () => {
		setIsEditMode(false);
	};

	const handleClickSave = () => {
		handleOffShowMode();
		onClick();
	};

	return (
		<div className='w-full flex flex-col'>
			{isEditMode ? (
				<div className='h-full flex items-center'>
					<TextField
						value={title}
						className='!ml-0 mr-3'
						onChange={onChange}
					/>
					<SaveButton onClick={handleClickSave} />
				</div>
			) : (
				<div
					className='relative w-fit'
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}>
					<span className='text-xl flex p-2'>{title}</span>
					{isHovering && (
						<Button
							className='absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1 -right-10 bg-transparent hover:bg-transparent h-fit'
							onClick={handleOnShowMode}>
							<i className='fa-solid fa-pen-to-square'></i>
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
