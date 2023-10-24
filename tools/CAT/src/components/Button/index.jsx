export default function Button({children, className = '', onClick}){
	return(
		<button 
			className={`text-xl rounded-sm bg-activeItems cursor-pointer p-2 ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}