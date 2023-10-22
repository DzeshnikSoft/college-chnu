import React from "react";
import Layout from "../components/Layout";
import NotFoundPage from "./NotFoundPage";
import MainPage from "./MainPage";
import SpecialityPage from "./SpecialityPage";
import History from "./HistoryPage/History";
export const routes = [
	{
		path: '/',
		element: <Layout><MainPage /></Layout>
	},
	{
		path: '/history',
		element: <Layout><History /></Layout>
	},
	{
		path: '/speciality/:name',
		element: <Layout><SpecialityPage/></Layout>
	},
	{
		path: '*',
		element: <Layout><NotFoundPage /></Layout>,
	},
]