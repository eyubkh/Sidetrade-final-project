"use client";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { IOrderLine } from "@/types/global";
import Link from "next/link";
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
				<Link href="/portal/orders">return</Link>

				<dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
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
