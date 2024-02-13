"use client";
import { AddNewProduct } from "@/components/AddNewProduct";
import { Container } from "@/components/Container";
import { useEffect, useState } from "react";

function ProductsPage() {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		(async () => {
			const response = await fetch("/api/products").then((data) => data.json());
			setProducts(response);
		})();
	}, []);

	console.log(products);
	return (
		<main className="overflow-y-scroll h-[100vh] py-24">
			<Container>
				<div className="flex gap-4 relative">
					<div className="pb-4 bg-white dark:bg-gray-900">
						<label htmlFor="table-search" className="sr-only">
							Search
						</label>
						<div className="relative mt-1">
							<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
								<svg
									className="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="text"
								id="table-search"
								className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search items"
							/>
						</div>
					</div>
					<AddNewProduct />
				</div>
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Product name
								</th>
								<th scope="col" className="px-6 py-3">
									Price
								</th>
								<th scope="col" className="px-6 py-3">
									Cost
								</th>
								<th scope="col" className="px-6 py-3">
									Profit
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => {
								const { product_name, product_id, selling_price, cost_price } =
									product;
								return (
									<tr
										key={product_id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
									>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{product_name}
										</th>
										<td className="px-6 py-4">£{selling_price}</td>
										<td className="px-6 py-4">£{cost_price}</td>
										<td className="px-6 py-4">£{selling_price - cost_price}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</Container>
		</main>
	);
}

export default ProductsPage;
