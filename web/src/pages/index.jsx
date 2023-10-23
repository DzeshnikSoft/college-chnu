import React from "react";
import Layout from "../components/Layout";
import NotFoundPage from "./NotFoundPage";
import MainPage from "./MainPage";
import SpecialityPage from "./SpecialityPage";
import HistoryPage from "./HistoryPage/HistoryPage";

export const routes = [
	{
		path: '/',
		element: <Layout><MainPage /></Layout>
	},
	{
		path: '/history',
		element: <Layout><HistoryPage /></Layout>
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