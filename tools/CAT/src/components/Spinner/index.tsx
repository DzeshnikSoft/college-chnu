import { Spinner } from "@chakra-ui/react";
interface StateSpinner {
	className: string;
}
export default function Spinner({ className }: StateSpinner) {
	return (
		<div className={`w-full h-full flex ${className}`}>
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
