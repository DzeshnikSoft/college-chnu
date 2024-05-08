function NavBarStage({ children, handleClose }) {
	const clickItemsWrapperNavBar = (e) => {
		e.stopPropagation();
	};

	return (
		<div
			onClick={clickItemsWrapperNavBar}
			className='w-96 z-10 h-full bg-backgroundHeaderColor flex flex-col'>
			<ul className='flex flex-col ml-0 w-full h-fit'>{children}</ul>
			<button
				onClick={handleClose}
				className='ml-5 mr-auto mb-5 mt-auto text-colorTextColor font-medium text-lg'>
				<i className='fa-solid fa-angle-left'></i> Закрити
			</button>
		</div>
	);
}

export default NavBarStage;
