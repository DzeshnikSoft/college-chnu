/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		extend: {
			colors: {
				backgroundHeaderColor: '#ffffff',
				accentTextColor: '#25b37c',
				colorTextColor: '#1A3853',
				mainTextColor: '#ffffff'
			},
			boxShadow:{
				bottomShadow: "0 3px 10px rgb(0 0 0 / 0.8)",
			}
		},
	},
	plugins: [],
};
