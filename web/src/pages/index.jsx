import React from 'react';
import Layout from '../components/Layout';
import NotFoundPage from './NotFoundPage';
import MainPage from './MainPage';
import SpecialityPage from './SpecialityPage';
import HistoryPage from './HistoryPage/HistoryPage';
import DynamicPage from './DynamicPage';

export const routes = [
	{
		path: '/',
		element: (
			<Layout>
				<MainPage />
			</Layout>
		),
	},
	{
		path: '/history',
		element: (
			<Layout>
				<HistoryPage />
			</Layout>
		),
	},
	{
		path: '/speciality/:name',
		element: (
			<Layout>
				<SpecialityPage />
			</Layout>
		),
	},
	{
		path: '/:category/:subcategory/:page',
		element: (
			<Layout>
				<DynamicPage />
			</Layout>
		),
	},
	{
		path: '*',
		element: (
			<Layout>
				<NotFoundPage />
			</Layout>
		),
	},
];
