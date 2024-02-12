"use client";

import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import { useState, useEffect } from "react";

function OrdersPage() {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		(async () => {
			const response = await fetch("/api/orders").then((data) => data.json());
			setOrders(response);
		})();
	}, []);
	return (
		<>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
							placeholder="Search htmlFor items"
						/>
					</div>
				</div>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Order
							</th>
							<th scope="col" className="px-6 py-3">
								Customer
							</th>
							<th scope="col" className="px-6 py-3">
								Date
							</th>
							<th scope="col" className="px-6 py-3">
								Total
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								Items
							</th>
							<th scope="col" className="px-6 py-3">
								Link
							</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => {
							// 	{
							// 		"order_line_id": 1,
							// 		"order_id": {
							// 				"order_id": 225,
							// 				"order_date": "2017-09-07",
							// 				"customer_id": {
							// 						"customer_id": 211,
							// 						"customer_name": "Shelly Ferrell"
							// 				},
							// 				"total_amount": 50,
							// 				"order_status_id": {
							// 						"status_name": "Shipped"
							// 				}
							// 		},
							// 		"product_id": {
							// 				"cost_price": 8,
							// 				"product_id": 1,
							// 				"product_name": "Sandal",
							// 				"selling_price": 10
							// 		},
							// 		"quantity": 1
							// },
							const { order_line_id, order_id, product_id, quantity } = order;
							const { order_date, total_amount, order_status_id, customer_id } =
								order_id;

							return (
								<tr
									key={order_line_id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<td className="px-6 py-4">#{order_line_id}</td>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{customer_id?.customer_name}
									</th>
									<td className="px-6 py-4">{order_date}</td>
									<td className="px-6 py-4">£{total_amount}</td>
									<td className="px-6 py-4">{order_status_id?.status_name}</td>
									<td className="px-6 py-4">{quantity} items</td>
									<td className="px-6 py-4">
										<Link href={`/portal/orders/${order_line_id}`}>
											<Button>show</Button>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default OrdersPage;