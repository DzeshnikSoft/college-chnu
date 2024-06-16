import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	PageLayout,
	News,
	Pages,
	//   Settings,
	//   Gallery,
	EditPage,
	EditNews,
	CreateNews,
	Authenticate,
	PrivateRoute,
} from './elements';

const routes = [
	{
		path: '/',
		element: <PrivateRoute />,
		children: [
			{
				path: '/',
				element: <PageLayout />,
				children: [
					{ path: 'news', element: <News /> },
					{ path: 'pages', element: <Pages /> },
					//   { path: 'settings', element: <Settings /> },
					//   { path: 'gallery', element: <Gallery /> },
					{
						path: 'edit-page/:category/:subcategory/:page',
						element: <EditPage />,
					},
					{ path: 'edit-news/:id', element: <EditNews /> },
					{ path: 'create-news', element: <CreateNews /> },
				],
			},
		],
	},
	{
		path: '/authenticate',
		element: <Authenticate />,
	},
];

const router = createBrowserRouter(routes);

export default router;
