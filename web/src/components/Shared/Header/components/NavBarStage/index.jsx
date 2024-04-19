function NavBarStage({ children }) {
	const clickItemsWrapperNavBar = (e) => {
		e.stopPropagation();
	};

	return (
		<div
			onClick={clickItemsWrapperNavBar}
			className='w-96 z-10 h-full bg-backgroundHeaderColor flex  flex-col'>
			<ul className='flex flex-col ml-0 w-full h-fit'>{children}</ul>
		</div>
	);
}

export default NavBarStage;
