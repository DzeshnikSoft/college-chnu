/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/react-toastify/dist/ReactToastify.css",
	],
	theme: {
		extend: {
			colors: {
				activeItems: "#edf2f7",
				red: "#FF1818",
				hoverActiveItems: "#A1A6B0",
			},
			height: {
				relativelyHeaderFullScreen: "92vh",
			},
		},
	},
	plugins: [],
};
