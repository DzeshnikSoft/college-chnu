export default function TextField({
	className = "",
	placeholder = "",
	value,
	onChange,
}) {
	return (
		<input
			type='text'
			value={value}
			placeholder={placeholder}
			className={`border ml-20 mr-3 rounded-md text-xl p-2 ${className}`}
			onChange={onChange}
		/>
	);
}
