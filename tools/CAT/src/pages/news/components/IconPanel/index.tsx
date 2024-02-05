import { ReactNode } from 'react';
import styles from '../IconPanel/style.module.css';

interface IconPanelProps {
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	children?: ReactNode;
	classNameIcon?: string;
}

function IconPanel({
	children,
	classNameIcon,
	className = '',
	onClick,
}: IconPanelProps) {
	return (
		<div
			onClick={onClick}
			className={`border h-full flex w-fit ${styles.iconWrapper} `}>
			<div className='w-10 h-full flex m-auto '>
				<i className={`m-auto ${classNameIcon}`}></i>
			</div>
			<div
				className={`duration-200 flex items-center ${styles.iconText}`}>
				{children}
			</div>
		</div>
	);
}

export default IconPanel;
