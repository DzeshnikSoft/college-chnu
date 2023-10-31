import { ReactNode } from 'react';

export interface BaseUIComponentProps {
	className?: string;
}

export interface BasePropsButton {
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	children?: ReactNode;
}

export interface BasePropsTextField {
	value?: string;
	placeholder?: string;
	className?: string;
	type?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
