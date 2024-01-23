import { ButtonProps } from '@/models/ui';

export default function Button({
	children,
	className = '',
	type = 'submit',
	onClick,
}: ButtonProps) {
	return (
		<button
			className={`text-xl rounded-sm bg-activeItems cursor-pointer p-2 ${className}`}
			onClick={onClick}>
			{children}
		</button>
	);
}
