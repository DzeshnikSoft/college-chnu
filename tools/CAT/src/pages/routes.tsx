import { RouteObject, useRoutes } from 'react-router-dom';
import {
	PageLayout,
	News,
	Pages,
	Settings,
	Gallery,
	EditPage,
	EditNews,
	CreateNews,
	Authenticate,
	PrivateRoute,
} from './elements';

const createRoute = (path, element, children = []) => ({
	path,
	element,
	children,
});

const publicRoutes = [createRoute('/authenticate', <Authenticate />)];

const privateRoutes = [
	createRoute('news', <News />),
	createRoute('pages', <Pages />),
	createRoute('settings', <Settings />),
	createRoute('gallery', <Gallery />),
	createRoute('edit-page/:category/:subcategory/:page', <EditPage />),
	createRoute('edit-news/:id', <EditNews />),
	createRoute('create-news', <CreateNews />),
];

export const routes: RouteObject[] = [
	createRoute('/', <PrivateRoute />, [
		createRoute('/', <PageLayout />, privateRoutes),
	]),
	...publicRoutes,
];

const AppRoutes = () => {
	const element = useRoutes(routes);
	return element;
};

export default AppRoutes;
