import { RouteObject } from "react-router-dom";

import PageLayout from "../layout/page-layout";
import Authenticate from "./authenticate";
import News from "./news";
import Pages from "./pages";
import Settings from "./settings";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <PageLayout />,
		children: [
			{
				path: "news",
				element: <News />,
			},
			{
				path: "pages",
				element: <Pages />,
			},
			{
				path: "settings",
				element: <Settings />,
			},
		],
	},
	{
		path: "/authenticate",
		element: <Authenticate />,
	},
];
