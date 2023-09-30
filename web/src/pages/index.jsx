import React from "react";
import Layout from "../components/Layout";
import NotFoundPage from "./NotFoundPage";
import MainPage from "./MainPage/mainPage";

export const routes = [
	{
		path: '/',
		element: <Layout><MainPage /></Layout>
	},
	{
		path: '*',
		element: <Layout><NotFoundPage /></Layout>,
	},
]