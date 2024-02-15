type Props = {
	children: React.ReactNode | React.ReactNode[];
	class?: string;
};
export function Container({ children, class: className }: Props) {
	return (
		<div className={`w-full max-w-[1100px] px-4 lg:px-0 mx-auto ${className}`}>
			{children}
		</div>
	);
}
