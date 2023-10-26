import { Outlet } from "react-router-dom";

import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const PageLayout = () => {
	return (
		<div className='flex w-full h-fit flex-col'>
			<Header />
			<div className='h-relativelyHeaderFullScreen w-full flex'>
				<Sidebar />
				<Outlet />
			</div>
		</div>
	);
};

export default PageLayout;
