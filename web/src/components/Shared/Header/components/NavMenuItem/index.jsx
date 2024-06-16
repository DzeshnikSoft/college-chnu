import { NavLink } from 'react-router-dom';
function NavMenuItem({ onClick, item, to }) {
	return (
		<li className='mx-5 text-colorTextColor text-lg my-4 flex cursor-pointer font-medium w-11/12'>
			<NavLink
				onClick={onClick}
				to={to}
				className={({ isActive }) =>
					isActive
						? 'font-black h-full items-center w-full flex justify-between'
						: `h-full items-center w-full flex justify-between`
				}>
				{item.title}
				<i className='fa-solid fa-angle-right'></i>
			</NavLink>
		</li>
	);
}

export default NavMenuItem;
