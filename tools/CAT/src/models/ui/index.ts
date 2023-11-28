import { ReactNode } from 'react';

export interface UIComponentProps {
	className?: string;
}

export interface ButtonProps {
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	children?: ReactNode;
}

export interface TextFieldProps {
	value?: string;
	placeholder?: string;
	className?: string;
	type?: string;
	required?: boolean;
	pattern?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Image {
	url: string;
	alt: string;
}
