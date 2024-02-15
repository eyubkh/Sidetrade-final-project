import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";

export function ShopHeader() {
	return (
		<nav className="z-10 top-0 fixed w-[calc(100vw_-_17px)] bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900">
			<Container>
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
					<Link
						href="/shop"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							shop
						</span>
					</Link>
					<div className="flex gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
						<Button to="/portal">portal</Button>
						<button
							data-collapse-toggle="navbar-cta"
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-cta"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>
					<div
						className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
						id="navbar-cta"
					>
						<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<Link
									href="/shop"
									className="block py-2 px-3 md:p-0 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Products
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</nav>
	);
}
