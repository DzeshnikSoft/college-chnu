import { useState, useEffect } from "react";
import SaveButton from "../SaveButton";
import {
	InputGroup,
	InputLeftAddon,
	Input,
	InputRightAddon,
} from "@chakra-ui/react";
import Button from "@/components/Button";

interface EditProps {
	name: string;
	value: string;
	placeholder?: string;
	type: string;
	withoutButtonSave?: boolean;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Edit({
	name,
	onChange,
	onClick,
	value = "",
	placeholder = "",
	type = "",
	withoutButtonSave = false,
}: EditProps) {
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
		setIsShowButton(false);
		onChange(event);
	};

	return (
		<div className='w-full flex flex-col'>
			<InputGroup>
				<InputLeftAddon children={name} />
				<Input
					placeholder={placeholder}
					onChange={handleInputChange}
					value={editValue}
				/>
				{type === "link" && <InputRightAddon children='.com' />}

				{!withoutButtonSave && isShowButton && (
					<SaveButton onClick={onClick} className='ml-4' />
				)}
			</InputGroup>
		</div>
	);
}
