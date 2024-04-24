import useMediaQuery from './useMediaQuery';
const ResponsiveSettings = {
	laptopXl: { min: 1500, max: 2570 },
	laptop: { min: 1100, max: 1500 },
	tablet: { min: 600, max: 1100 },
	mobile: { max: 600 },
};

const useResponsive = () => {
	const isLaptopXl = useMediaQuery(
		`(min-width: ${ResponsiveSettings.laptopXl.min}px) and (max-width: ${ResponsiveSettings.laptopXl.max}px)`
	);
	const isLaptop = useMediaQuery(
		`(min-width: ${ResponsiveSettings.laptop.min}px) and (max-width: ${ResponsiveSettings.laptop.max}px)`
	);
	const isTablet = useMediaQuery(
		`(min-width: ${ResponsiveSettings.tablet.min}px) and (max-width: ${ResponsiveSettings.tablet.max}px)`
	);
	const isMobile = useMediaQuery(
		`(max-width: ${ResponsiveSettings.mobile.max}px)`
	);

	return { isLaptopXl, isLaptop, isTablet, isMobile };
};

export default useResponsive;
