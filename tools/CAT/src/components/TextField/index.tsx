import { BasePropsTextField } from "@/models/ui";

export default function TextField({
	type = "",
	className = "",
	placeholder = "",
	value,
	onChange,
}: BasePropsTextField) {
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
