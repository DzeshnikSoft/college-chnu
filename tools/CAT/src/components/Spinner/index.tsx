import { Spinner } from "@chakra-ui/react";

interface StateSpinner {
	className?: string;
}

export default function SpinnerWrapper({ className = "" }: StateSpinner) {
	return (
		<div
			className={`w-full h-full flex items-center justify-center${className}`}>
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='blue.500'
				size='xl'
			/>
		</div>
	);
}
