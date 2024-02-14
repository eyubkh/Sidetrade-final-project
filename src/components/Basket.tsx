"use client";
import { useState } from "react";
import { Button } from "./Button";
import { ButtonArrow } from "./ButtonArrow";
import { IProduct } from "@/types/global";

type Props = {
	data: {
		cart: IProduct[];
		setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
	};
};

export function Basket({ data: { cart, setCart } }: Props) {
	const [toggle, setToggle] = useState(false);

	const onClikBuyHandler = () => {
		setCart([]);
		setToggle(false);
	};
	return (
		<div className="relative w-fit">
			<button
				type="button"
				className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				onClick={() => setToggle(!toggle)}
			>
				<svg
					className="w-6 h-6 text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						fillRule="evenodd"
						d="M4 4c0-.6.4-1 1-1h1.5c.5 0 .9.3 1 .8L7.9 6H19a1 1 0 0 1 1 1.2l-1.3 6a1 1 0 0 1-1 .8h-8l.2 1H17a3 3 0 1 1-2.8 2h-2.4a3 3 0 1 1-4-1.8L5.7 5H5a1 1 0 0 1-1-1Z"
						clipRule="evenodd"
					/>
				</svg>

				<span className="sr-only">Notifications</span>
				<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
					{cart.length}
				</div>
			</button>

			<div
				data-popover
				id="popover-top"
				role="tooltip"
				style={{ display: toggle ? "block" : "none", opacity: toggle ? 1 : 0 }}
				className="absolute z-10 top-[60px] right-0  inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
			>
				<div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
					<h3 className="font-semibold text-gray-900 dark:text-white">
						Products
					</h3>
				</div>
				{cart.map((item) => {
					return (
						<div className="px-3 py-2 border-b-2 ">
							<p>{item.product_name}</p>
						</div>
					);
				})}

				<button
					type="button"
					className="flex m-2 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
					onClick={onClikBuyHandler}
				>
					buy
				</button>
			</div>
		</div>
	);
}
