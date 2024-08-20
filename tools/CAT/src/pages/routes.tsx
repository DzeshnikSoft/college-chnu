import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	PageLayout,
	News,
	NavMenu,
	Settings,
	Gallery,
	EditPage,
	EditNews,
	CreateNews,
	Authenticate,
	PrivateRoute,
	CollectiveCollege,
	SeparatePages,
	EditSeparatePage,
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
					{ path: 'nav-menu', element: <NavMenu /> },
					{ path: 'settings', element: <Settings /> },
					{ path: 'gallery', element: <Gallery /> },
					{ path: 'separate-pages', element: <SeparatePages /> },
					{ path: 'collective', element: <CollectiveCollege /> },
					{
						path: 'edit-separate-page/:category/:subcategory/:page',
						element: <EditSeparatePage />,
					},
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
