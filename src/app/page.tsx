import { ButtonLink } from "@/components/atoms/ButtonLink";
import Image from "next/image";

export default function Home() {
	return (
		<main className="min-h-screen grid content-center">
			<div className="flex flex-col justify-center items-center gap-4">
				<h1 className="font-bold text-2xl">Welcome to Sidetrade products</h1>
				<div className="flex gap-4 justify-center">
					<ButtonLink text="portal" to="/portal" />
					<ButtonLink text="shop" />
				</div>
			</div>
		</main>
	);
}
