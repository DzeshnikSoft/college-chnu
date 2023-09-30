import React from "react";
import Layout from "../components/Layout";
import NotFoundPage from "./NotFoundPage";
import MainPage from "./MainPage/mainPage";

export const routes = [
	{
		path: '/',
		element: <Layout><MainPage /></Layout>
	},
	{
		path: '*',
		element: <Layout><NotFoundPage /></Layout>,
	},
]

/*
{
	"name": "web",
	"version": "0.1.0",
	"private": true,
	"dependencies": {
		"@date-io/date-fns": "^2.14.0",
		"@fortawesome/fontawesome-svg-core": "^6.1.1",
		"@fortawesome/free-solid-svg-icons": "^6.1.1",
		"@fortawesome/react-fontawesome": "^0.1.18",
		"@testing-library/jest-dom": "^5.16.5",
		"@testing-library/react": "^13.4.0",
		"@testing-library/user-event": "^14.4.3",
		"@types/react-transition-group": "^4.4.5",
		"axios": "^0.27.2",
		"draft-js": "^0.11.7",
		"draftjs-to-html": "^0.9.1",
		"react": "^18.2.0",
		"react-dom": "^18.2.0",
		"react-draft-wysiwyg": "^1.14.7",
		"react-froala-wysiwyg": "^4.0.11",
		"react-router": "^6.2.1",
		"react-router-dom": "^6.8.1",
		"react-scripts": "5.0.1",
		"react-slick": "^0.29.0",
		"react-spinners": "^0.12.0",
		"react-transition-group": "^4.4.2",
		"suneditor": "^2.43.8",
		"suneditor-react": "^3.4.0",
		"web-vitals": "^2.1.4"
	},
	"scripts": {
		"start": "react-scripts start",
		"build": "react-scripts build",
		"test": "react-scripts test",
		"eject": "react-scripts eject"
	},
	"eslintConfig": {
		"extends": [
			"react-app",
			"react-app/jest"
		]
	},
	"browserslist": {
		"production": [
			">0.2%",
			"not dead",
			"not op_mini all"
		],
		"development": [
			"last 1 chrome version",
			"last 1 firefox version",
			"last 1 safari version"
		]
	}
}

 */