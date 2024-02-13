type Props = {
	children: React.ReactNode | React.ReactNode[];
};
export function Container({ children }: Props) {
	return <div className="w-[1100px] mx-auto">{children}</div>;
}
