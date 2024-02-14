import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const offset = Number(searchParams.get("offset"));
	const status = searchParams.get("status");

	console.log(offset, status);
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_KEY;
	if (!url || !key) return Response.json({ error: "Error access to db.s" });

	const supabase = createClient<Database>(url, key);

	const products = await getOrders(supabase, offset, status);
	return Response.json(products);
}

async function getOrders(
	supabase: SupabaseClient<Database>,
	offset: number,
	status: string,
) {
	if (status === "Shipped" || status === "Unshipped") {
		const { data: products, error } = await supabase
			.from("order_line")
			.select(
				"*, order_id!inner(*, customer_id(customer_id,customer_name ), order_status_id!inner(status_name)), product_id(*) ",
			)
			.eq("order_id.order_status_id.status_name", status)
			.range(offset, offset + 10);

		if (error) throw new Error("Error access to db.");

		return products;
	}

	const { data: products, error } = await supabase
		.from("order_line")
		.select(
			"*, order_id(*, customer_id(customer_id,customer_name ), order_status_id(status_name)), product_id(*) ",
		)
		.range(offset, offset + 10);
	if (error) throw new Error("Error access to db.");

	return products;
}
