import { BasePropsButton } from "@/models/ui";

export default function Button({
	children,
	className = "",
	onClick,
}: BasePropsButton) {
	return (
		<button
			type='submit'
			className={`text-xl rounded-sm bg-activeItems cursor-pointer p-2 ${className}`}
			onClick={onClick}>
			{children}
		</button>
	);
}
