"use client";
import { BreadScrumb } from "@/components/BreadScrumb";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { IOrderLine } from "@/types/global";
import { useEffect, useState } from "react";

type Props = {
	params: {
		id: string;
	};
};

function Order({ params }: Props) {
	const { id } = params;
	const [order, setOrder] = useState<IOrderLine | null>(null);

	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/orders/${id}`).then((data) =>
				data.json(),
			);
			setOrder(response[0]);
		})();
	}, []);

	if (!order) return <h1>loading...</h1>;

	return (
		<main className=" overflow-y-scroll h-[100vh] pt-24 bg-white">
			<Container>
				<BreadScrumb id={id} />

				<ol className="flex items-center justify-center mx-10">
					<li className="relative w-full mb-6">
						<div className="flex items-center">
							<div className=" flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
								<span className="flex w-3 h-3 bg-blue-600 rounded-full" />
							</div>
							<div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
						</div>
						<div className="mt-3">
							<h3 className="font-medium text-gray-900 dark:text-white">
								Unshipped
							</h3>
						</div>
					</li>
					<li className="relative w-full mb-6">
						<div className="flex items-center">
							<div
								style={{
									backgroundColor:
										order.order_id.order_status_id.status_name === "Shipped"
											? "#b3d5fc"
											: "#e1e3e8",
								}}
								className=" flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"
							>
								<span
									style={{
										backgroundColor:
											order.order_id.order_status_id.status_name === "Shipped"
												? "#0252e1"
												: "#111723",
									}}
									className="flex w-3 h-3  rounded-full"
								/>
							</div>
							<div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
						</div>
						<div className="mt-3">
							<h3 className="font-medium text-gray-900 dark:text-white">
								Shipped
							</h3>
						</div>
					</li>
					<li className="relative w-fit mb-6">
						<div className="flex items-center">
							<div className=" flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full ring-0 ring-white dark:bg-gray-700 sm:ring-8 dark:ring-gray-900 shrink-0">
								<span className="flex w-3 h-3 bg-gray-900 rounded-full dark:bg-gray-300" />
							</div>
						</div>
						<div className="mt-3">
							<h3 className="font-medium text-gray-900 dark:text-white">
								Delivered
							</h3>
						</div>
					</li>
				</ol>

				<dl className="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
					<div className="flex flex-col pb-3">
						<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
							Customer name
						</dt>
						<dd className="text-lg font-semibold">
							{order.order_id.customer_id.customer_name}
						</dd>
					</div>
					<div className="flex flex-col pb-3">
						<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
							Email address
						</dt>
						<dd className="text-lg font-semibold">
							{order.order_id.customer_id.email}
						</dd>
					</div>
					<div className="flex flex-col py-3">
						<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
							Home address
						</dt>
						<dd className="text-lg font-semibold">
							{order.order_id.customer_id.address_line_1},{" "}
							{order.order_id.customer_id.city}
						</dd>
					</div>
					<div className="flex flex-col pt-3">
						<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
							Phone number
						</dt>
						<dd className="text-lg font-semibold">
							{order.order_id.customer_id.phone_number}
						</dd>
					</div>
					<div className="flex flex-col pt-3">
						<dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
							Order date
						</dt>
						<dd className="text-lg font-semibold">
							{order.order_id.order_date}
						</dd>
					</div>
				</dl>
			</Container>
			<Footer />
		</main>
	);
}

export default Order;
