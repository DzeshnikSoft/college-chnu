/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			laptopXl: { max: '2570px' },

			xl: { max: '1025px' },

			xlg: { max: '930px' },

			lg: { max: '769px' },

			md: { max: '600px' },

			xs: { max: '400px' },

			xss: { max: '320px' },
		},

		extend: {
			colors: {
				backgroundHeaderColor: '#ffffff',
				accentTextColor: '#25b37c',
				colorTextColor: '#1A3853',
				mainTextColor: '#ffffff',
				opacityBackgroundText: 'rgba(4, 4, 39, 0.7)',
				backgroundBorder: '#e6e6e6',
				textFooter: '#8f979b',
			},

			fontFamily: {
				subTitleTextCarousel: "'MedievalSharp', cursive",
			},
			boxShadow: {
				bottomShadow: '0 3px 10px rgb(0 0 0 / 0.8)',
				md: '0 3px 10px rgba(0, 0, 0, 0.5)',
			},
			height: {
				relativelyHeaderFullScreen: '91vh',
			},
		},
	},
	plugins: [],
};
