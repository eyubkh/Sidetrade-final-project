"use client";
import { Basket } from "@/components/Basket";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { LoadingProducts } from "@/components/LoadingProducts";
import { SearchBar } from "@/components/SearchBar";
import { IProduct } from "@/types/global";
import { useEffect, useState } from "react";

function Page() {
	const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
	const [cart, setCart] = useState<IProduct[]>([]);
	const [filter, setFilter] = useState("");
	useEffect(() => {
		(async () => {
			const response = await fetch("/api/products").then((data) => data.json());
			setProducts(response);
		})();
	}, []);

	return (
		<main className="overflow-y-scroll h-[100vh] pt-24 bg-white">
			<Container>
				<div className="flex justify-between my-4">
					<SearchBar setFilter={setFilter} />
					<Basket data={{ cart, setCart }} />
				</div>
				{products ? (
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
						{products
							.filter((product) => {
								const name = product.product_name;
								if (name) {
									return name.toLowerCase().includes(filter.toLowerCase());
								}
								return false;
							})
							.map((product) => {
								return (
									<div className="flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
										<img
											className="p-8 rounded-t-lg"
											src={product.image_url || "https://dummyimage.com/300"}
											alt="product "
										/>
										<div className="px-5 pb-5">
											<a href="/#">
												<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
													{product.product_name}
												</h5>
											</a>

											<div className="flex items-center justify-between">
												<span className="text-3xl font-bold text-gray-900 dark:text-white">
													£{product.selling_price}
												</span>
												<button
													type="button"
													onClick={() => {
														setCart((cart) => [...cart, product]);
													}}
													className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
												>
													Add to cart
												</button>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				) : (
					<LoadingProducts />
				)}
			</Container>
			<Footer />
		</main>
	);
}

export default Page;
