export default function AddButton({className = ''}){
	return(
		<div className={`rounded-sm flex bg-activeItems hover:bg-hoverActiveItems items-center justify-center cursor-pointer hover:!text-white px-3 ${className}`}>
			<i className="fa-solid fa-plus text-3xl"></i>
			<span className="text-lg ml-3">Додати</span>
		</div>
	)
}