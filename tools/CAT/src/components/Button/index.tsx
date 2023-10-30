import { BasePropsButton } from '@/models/ui';

export default function Button({ children, className = '', onClick }: BasePropsButton) {
	return (
		<button
			className={`text-xl rounded-md bg-activeItems cursor-pointer p-2 ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
