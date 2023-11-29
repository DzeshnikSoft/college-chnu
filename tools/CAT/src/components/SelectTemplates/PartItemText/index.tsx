import { ReactNode } from "react";

interface PartItemText {
	children?: ReactNode;
	className?: string;
}

export default function PartItemText({
	children,
	className = "",
}: PartItemText) {
	return (
		<div
			className={`w-full text-3xl h-full flex items-center justify-center ${className}`}>
			<span>{children}</span>
		</div>
	);
}
