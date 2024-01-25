import React from 'react';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const Layout = ({ children }) => {
	return (
		<div className='flex h-fit flex-col justify-between w-full'>
			<Header />
			<div className='h-fit w-full flex flex-col items-center justify-center'>
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
//*h-[calc(100vh-9vh-330px)] max-h-fit
