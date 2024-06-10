import { RouteObject } from 'react-router-dom';

import PageLayout from '../layout/page-layout';
import Authenticate from './authenticate';
import EditNews from './editNews';
import EditPage from './EditPage';
import News from './news';
import Pages from './pages';
import Settings from './settings';
import CreateNews from './createNews';
import Gallery from './gallery';
import CollectiveCollege from './collectiveCollege';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <PageLayout />,
		children: [
			{
				path: 'news',
				element: <News />,
			},
			{
				path: 'pages',
				element: <Pages />,
			},
			{
				path: 'settings',
				element: <Settings />,
			},
			{
				path: 'gallery',
				element: <Gallery />,
			},
			{
				path: 'collective',
				element: <CollectiveCollege />,
			},
		],
	},
	{
		path: '/edit-page/:category/:subcategory/:page',
		element: <EditPage />,
	},
	{
		path: '/edit-news/:id',
		element: <EditNews />,
	},
	{
		path: '/create-news',
		element: <CreateNews />,
	},

	{
		path: '/authenticate',
		element: <Authenticate />,
	},
];
