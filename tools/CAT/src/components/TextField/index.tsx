import { TextFieldProps } from "@/models/ui";

export default function TextField({
	type = "",
	className = "",
	placeholder = "",
	value,
	onChange,
}: TextFieldProps) {
	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			className={`border rounded-md text-xl p-2 ${className}`}
			onChange={onChange}
		/>
	);
}
