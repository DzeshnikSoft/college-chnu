import useMediaQuery from './useMediaQuery';
const responsiveSettings = {
	laptopXl: { min: 1500, max: 2570 },
	laptop: { min: 1100, max: 1500 },
	tablet: { min: 600, max: 1100 },
	mobile: { max: 600 },
};

const useResponsive = () => {
	const isLaptopXl = useMediaQuery(
		`(min-width: ${responsiveSettings.laptopXl.min}px) and (max-width: ${responsiveSettings.laptopXl.max}px)`
	);
	const isLaptop = useMediaQuery(
		`(min-width: ${responsiveSettings.laptop.min}px) and (max-width: ${responsiveSettings.laptop.max}px)`
	);
	const isTablet = useMediaQuery(
		`(min-width: ${responsiveSettings.tablet.min}px) and (max-width: ${responsiveSettings.tablet.max}px)`
	);
	const isMobile = useMediaQuery(
		`(max-width: ${responsiveSettings.mobile.max}px)`
	);

	return { isLaptopXl, isLaptop, isTablet, isMobile };
};

export default useResponsive;
