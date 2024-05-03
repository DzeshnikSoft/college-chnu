export default function Search({
	type = '',
	className = '',
	placeholder = '',
	value,
	onChange,
}) {
	return (
		<div className='h-10 flex items-center pl-3 mt-5 text-colorTextColor w-72 border border-colorTextColor focus:border-2 rounded-lg'>
			<i className='fa-solid fa-magnifying-glass mr-3'></i>
			<input
				type={type}
				value={value}
				placeholder={placeholder}
				className={`border-none outline-none w-10/12 font-medium placeholder:text-[#36536D] placeholder:font-normal ${className}`}
				onChange={onChange}
			/>
		</div>
	);
}
