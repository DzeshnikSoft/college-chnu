/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/react-toastify/dist/ReactToastify.css',
	],
	theme: {
		extend: {
			colors: {
				activeItems: '#3E9599',
				red: '#FF1818',
				hoverActiveItems: '#347A7A',
			},
			height: {
				relativelyHeaderFullScreen: '92vh',
			},
		},
	},
	plugins: [],
};
