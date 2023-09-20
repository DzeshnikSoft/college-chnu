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
				backgroundHeaderColor: '#1A3853',
				accentTextColor: '#25b37c',
				textColor: '#ffffff'
			},
			boxShadow:{
				bottomShadow: "0 3px 10px rgb(0 0 0 / 0.8)",
			}
		},
	},
	plugins: [],
};
