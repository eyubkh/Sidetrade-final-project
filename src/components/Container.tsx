type Props = {
	children: React.ReactNode | React.ReactNode[];
};
export function Container({ children }: Props) {
	return (
		<div className=" w-full max-w-[1100px] px-4 lg:px-0 mx-auto">
			{children}
		</div>
	);
}
