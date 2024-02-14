"use client";
import { Container } from "@/components/Container";
import { DropDown } from "@/components/DropDown";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/Button";
import { IOrderLine } from "@/types/global";
import { useState, useEffect, useRef } from "react";

function OrdersPage() {
	const [orders, setOrders] = useState<IOrderLine[]>([]);
	const [status, setStatus] = useState("All");
	const [filter, setFilter] = useState("");
	useEffect(() => {
		(async () => {
			const response = await fetch(
				`/api/orders?offset=0&status=${status}&customer=${filter}`,
			).then((data) => data.json());
			setOrders(response);
		})();
	}, [status, filter]);

	const onScrollHandler = async (event: React.UIEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		const { scrollTop, scrollHeight, clientHeight } = target;

		const isNearBottom = scrollTop + clientHeight >= scrollHeight;
		console.log(isNearBottom);
		if (isNearBottom) {
			console.log({ isNearBottom });
			const response = await fetch(
				`/api/orders?offset=${orders.length}&status=${status}&customer=${filter}`,
			).then((data) => data.json());
			setOrders((prev) => prev.concat(response));
		}
	};

	return (
		<main
			onScroll={onScrollHandler}
			className="overflow-y-scroll h-[100vh] pt-24"
		>
			<Container>
				<div className="flex gap-4 py-4 relative">
					<SearchBar setFilter={setFilter} delay={1000} />
					<DropDown status={{ status, setStatus }} />
				</div>
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
								const { order_line_id, order_id, product_id, quantity } = order;
								const {
									order_date,
									total_amount,
									order_status_id,
									customer_id,
								} = order_id;

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
										<td className="px-6 py-4">
											{order_status_id?.status_name}
										</td>
										<td className="px-6 py-4">{quantity} items</td>
										<td className="px-6 py-4">
											<Button to={`/portal/orders/${order_line_id}`}>
												show
											</Button>
										</td>
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

export default OrdersPage;
