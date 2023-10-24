/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				activeItems: "#B4BCC7",
				red: "#FF1818",
				hoverActiveItems: "#787D85",
			},
			height: {
				relativelyHeaderFullScreen: "92vh",
			},
		},
	},
	plugins: [],
};
