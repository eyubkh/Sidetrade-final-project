"use client";
import { AddNewProduct } from "@/components/AddNewProduct";
import { Button } from "@/components/Button";
import { ButtonDelete } from "@/components/ButtonDelete";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { LoadingTable } from "@/components/LoadingTable";
import { SearchBar } from "@/components/SearchBar";
import { IProduct } from "@/types/global";
import { useEffect, useState } from "react";

function ProductsPage() {
	const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
	const [filter, setFilter] = useState("");
	useEffect(() => {
		(async () => {
			const response = await fetch("/api/products").then((data) => data.json());
			setProducts(response);
		})();
	}, []);

	return (
		<main className=" overflow-y-scroll h-[100vh] pt-24 bg-white">
			<Container>
				<div className="flex items-center justify-between gap-4 py-4 relative">
					<SearchBar setFilter={setFilter} />
					<AddNewProduct setProduts={setProducts} />
				</div>
				{products ? (
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
									<th scope="col" className="px-6 py-3">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{products
									.filter((product) => {
										const name = product.product_name;
										if (name) {
											return name.toLowerCase().includes(filter.toLowerCase());
										}
										return false;
									})
									.map((product) => {
										const {
											product_name,
											product_id,
											selling_price,
											cost_price,
										} = product;
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
												<td className="px-6 py-4">
													£{selling_price - cost_price}
												</td>
												<td className="px-1 py-4">
													<ButtonDelete
														setProducts={setProducts}
														targetId={product_id}
														targetName={product_name}
													/>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				) : (
					<LoadingTable />
				)}
			</Container>
			<Footer />
		</main>
	);
}

export default ProductsPage;
