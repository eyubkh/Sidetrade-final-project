"use client";
import { IProduct } from "@/types/global";
import { useState } from "react";

type Props = {
	setProduts: React.Dispatch<React.SetStateAction<IProduct[] | undefined>>;
};

interface CustomForm extends EventTarget {
	product_name: HTMLInputElement;
	selling_price: HTMLInputElement;
	cost_price: HTMLInputElement;
	product_image: HTMLInputElement;
}

export function AddNewProduct({ setProduts }: Props) {
	const [toggle, setToggle] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const target = event.target as CustomForm;

		const newProduct = {
			product_name: target.product_name.value,
			selling_price: target.selling_price.value,
			cost_price: target.cost_price.value,
			image_url: target.product_image.value,
		};

		const response = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		}).then((data) => data.json());

		setToggle(false);
		setProduts((prev) => {
			if (prev) {
				return prev.concat(response);
			}
		});
	};

	return (
		<>
			<button
				type="button"
				data-modal-target="crud-modal"
				onClick={() => setToggle(!toggle)}
				className="text-white w-fit h-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				<svg
					className="w-6 h-6 text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 12h14m-7 7V5"
					/>
				</svg>
				<span className="sr-only">Add product</span>
			</button>

			<div
				style={{ display: toggle ? "grid" : "none" }}
				className=" overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50  grid place-content-center w-full md:inset-0 h-full max-h-full bg-opacity-30 bg-black"
			>
				<div className="relative p-4 w-full max-w-md max-h-full">
					{/* <!-- Modal content --> */}
					<div className="relative  bg-white rounded-lg shadow dark:bg-gray-700">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Create New Product
							</h3>
							<button
								type="button"
								onClick={() => setToggle(false)}
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="crud-modal"
							>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						{/* <!-- Modal body --> */}
						<form action="#" onSubmit={handleSubmit} className="p-4">
							<div className="grid gap-4 mb-4 grid-cols-2">
								<div className="col-span-2">
									<label
										htmlFor="product_name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Name
									</label>
									<input
										type="text"
										name="product_name"
										id="product_name"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Type product name"
										required
									/>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="product_image"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Image
									</label>
									<input
										type="text"
										name="product_image"
										id="product_image"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Paste image URL here"
									/>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="selling_price"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Selling price
									</label>
									<input
										type="number"
										name="selling_price"
										id="selling_price"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="£20"
										required
									/>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="cost_price"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Cost price
									</label>
									<input
										type="number"
										name="cost_price"
										id="cost_price"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="£10"
										required
									/>
								</div>
							</div>
							<button
								type="submit"
								className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								<svg
									className="me-1 -ms-1 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
										clipRule="evenodd"
									/>
								</svg>
								Add new product
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
