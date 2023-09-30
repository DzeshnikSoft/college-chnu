import { Outlet } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

const PageLayout = () => {
	return (
		<Box>
			<Header />
			<Flex>
				<Sidebar />
				<Outlet />
			</Flex>
		</Box>
	);
};

export default PageLayout;
