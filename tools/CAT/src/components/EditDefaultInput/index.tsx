import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SaveButton from "../SaveButton";

interface EditDefaultInputProps {
	className?: string;
	value: string;
	placeholder?: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditDefaultInput({
	onChange,
	value,
	onClick,
	placeholder,
	className,
}: EditDefaultInputProps) {
	const [editValue, setEditValue] = useState<string>(value);
	const [isShowButton, setIsShowButton] = useState<boolean>(false);
	const [initialValue, setInitialValue] = useState<string>(value);

	useEffect(() => {
		if (editValue === initialValue) {
			setIsShowButton(false);
		} else {
			setIsShowButton(true);
		}
	}, [editValue, initialValue]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEditValue(event.target.value);
		onChange(event);
	};

	return (
		<div className={`flex w-fit max-w-fit h-fit ${className}`}>
			<Input
				placeholder={placeholder}
				onChange={handleInputChange}
				value={editValue}
				className='!border-white !bg-textColorTitlePage min-w-60 w-fit text-4xl text-white font-medium p-2'
			/>
			{isShowButton && <SaveButton onClick={onClick} className='ml-4' />}
		</div>
	);
}
