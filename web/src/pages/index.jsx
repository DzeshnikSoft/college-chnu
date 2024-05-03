import React from 'react';
import Layout from '../components/Layout';
import NotFoundPage from './NotFoundPage';
import MainPage from './MainPage';
import HistoryPage from './HistoryPage/HistoryPage';
import DynamicPage from './DynamicPage';
import AllNews from './AllNews';
import SingleNewsPage from './SingleNewsPage';
import SearchPage from './SearchPage';

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
		path: '/news',
		element: (
			<Layout>
				<AllNews />
			</Layout>
		),
	},
	{
		path: '/news/:name',
		element: (
			<Layout>
				<SingleNewsPage />
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
		path: '/search',
		element: (
			<Layout>
				<SearchPage />
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
