import React from "react";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer"

const Layout = ({ children }) => {
	return (
		<div className="flex flex-col justify-between w-full">
			<Header />
			<div className="min-h-[calc(100vh-9vh-500px)] h-fit">
				{children}
			</div>
			<Footer />
		</div>
	)
}

export default Layout;