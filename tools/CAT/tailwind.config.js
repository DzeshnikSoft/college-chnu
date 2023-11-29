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
				textColorTitlePage: "rgba(4, 4, 39, 0.7)",
			},
			height: {
				relativelyHeaderFullScreen: "92vh",
			},
		},
	},
	plugins: [],
};
