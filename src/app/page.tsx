import { Button } from "@/components/Button";
import { ButtonArrow } from "@/components/ButtonArrow";
import { ButtonLink } from "@/components/ButtonLink";
export default function Home() {
	return (
		<main className="min-h-screen grid content-center">
			<div className="absolute inset-0 -z-10 h-full w-full  bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-gray-900 dark:bg-[radial-gradient(#464646_1px,transparent_1px)]" />
			<section className="">
				<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
					<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
						Sidetrade products catalogue
					</h1>
					<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
						Empower your business with Sidetrade's cutting-edge products.
						Effortlessly manage and optimize your portfolio through our
						intuitive portal.
					</p>
					<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
						<ButtonArrow to="/shop">Shop</ButtonArrow>
						<Button to="/portal">portal</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
