import React from 'react';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const Layout = ({ children }) => {
	return (
		<div className='flex min-h-screen h-fit flex-col w-full'>
			<Header />
			<div className='w-full h-full flex flex-auto flex-col items-center '>
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
