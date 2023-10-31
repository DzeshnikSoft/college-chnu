import { BasePropsButton } from '@/models/ui';

export default function Button({ children, className = '', onClick }: BasePropsButton) {
	return (
		<button
<<<<<<< HEAD
			type='submit'
			className={`text-xl rounded-sm bg-activeItems cursor-pointer p-2 ${className}`}
			onClick={onClick}>
=======
			className={`text-xl rounded-md bg-activeItems cursor-pointer p-2 ${className}`}
			onClick={onClick}
		>
>>>>>>> development
			{children}
		</button>
	);
}
