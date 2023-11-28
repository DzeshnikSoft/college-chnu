import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { NavLink as MyNavLink, navLinks } from '@/utils/navLinks';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';

const Sidebar = () => {
	const [isExpanded, setIsExpanded] = useState<boolean>(true);

	const toggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<Box
			width={'fit-content'}
			className='border-r h-full flex flex-col justify-between'>
			<Box>
				{navLinks.map(({ icon, label, path }: MyNavLink, index) => (
					<NavLink
						to={path}
						key={index}
						className={({ isActive }) =>
							`h-14 text-2xl flex items-center py-2 px-3 border-b duration-200 ${
								isActive
									? 'bg-activeItems'
									: 'hover:bg-activeItems'
							}`
						}>
						<i className={`${icon} mx-1`}></i>
						{isExpanded && <p>{label}</p>}
					</NavLink>
				))}
			</Box>
			<Box className='w-full flex justify-center mb-3'>
				<IconButton
					colorScheme='teal'
					size={'md'}
					onClick={toggle}
					aria-label='Expand menu'
					icon={isExpanded ? <ArrowLeftIcon /> : <ArrowRightIcon />}
				/>
			</Box>
		</Box>
	);
};

export default Sidebar;
