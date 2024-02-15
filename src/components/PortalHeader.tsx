"use client";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";
import { useState } from "react";

export function PortalHeader() {
	return (
		<nav className="z-10 top-0 fixed w-[calc(100vw_-_17px)] bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900">
			<Container>
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
					<Link
						href="/portal"
						className="flex items-center  space-x-3 rtl:space-x-reverse"
					>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Portal
						</span>
					</Link>
					<div className=" md:order-2 hidden md:flex space-x-3 md:space-x-0 rtl:space-x-reverse">
						<Button to="/shop">shop</Button>
					</div>

					<div className="items-center justify-between  flex w-auto order-1">
						<ul className="flex  font-medium p-0 border border-gray-100 rounded-lg  space-x-8 rtl:space-x-reverse flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<Link
									href="/portal"
									className="block p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Products
								</Link>
							</li>
							<li>
								<Link
									href="/portal/orders"
									className="block p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Orders
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</nav>
	);
}
