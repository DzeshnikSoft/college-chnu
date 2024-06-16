import { Button } from '@chakra-ui/react';

interface ButtonArrowProps {
	className?: string;
	type: 'left' | 'right' | 'top' | 'bottom';
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

function ButtonArrow({ className = '', type, onClick }: ButtonArrowProps) {
	const renderArrow = () => {
		switch (type) {
			case 'left':
				return <i className='fa-solid fa-arrow-left'></i>;
			case 'right':
				return <i className='fa-solid fa-arrow-right'></i>;
			case 'top':
				return <i className='fa-solid fa-arrow-up'></i>;
			case 'bottom':
				return <i className='fa-solid fa-arrow-down'></i>;
			default:
				return <></>;
		}
	};
	return (
		<Button onClick={onClick} className={className}>
			{renderArrow()}
		</Button>
	);
}

export default ButtonArrow;
