import { RouteObject } from 'react-router-dom';

import PageLayout from '../layout/page-layout';
import Authenticate from './authenticate';
import News from './news';
import Pages from './pages';
import Settings from './settings';
import EditPage from './editPage';

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
				path: '/:category/:subcategory/:page',
				element: <EditPage />,
			},
		],
	},
	{
		path: '/authenticate',
		element: <Authenticate />,
	},
];
