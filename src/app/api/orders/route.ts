import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const offset = Number(searchParams.get("offset")) ?? 0;
	const status = searchParams.get("status") ?? "All";
	const customer = searchParams.get("customer") ?? "";

	console.log(offset, status, customer);
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_KEY;
	if (!url || !key) return Response.json({ error: "Error access to db.s" });

	const supabase = createClient<Database>(url, key);

	const products = await getOrders(supabase, offset, status, customer);
	return Response.json(products);
}

async function getOrders(
	supabase: SupabaseClient<Database>,
	offset: number,
	status: string,
	customer: string,
) {
	const query = `
			*, 
			order_id!inner(
				*, 
				customer_id!inner(customer_id,customer_name ), 
				order_status_id!inner(status_name)
			), 
			product_id(*) 
	`;

	if (status === "Shipped" || status === "Unshipped") {
		const { data: orders, error } = await supabase
			.from("order_line")
			.select(query)
			.eq("order_id.order_status_id.status_name", status)
			.ilike("order_id.customer_id.customer_name", `%${customer}%`)
			.range(offset, offset + 10);

		if (error) throw new Error("Error access to db.");
		return orders;
	}

	const { data: orders, error } = await supabase
		.from("order_line")
		.select(query)
		.ilike("order_id.customer_id.customer_name", `%${customer}%`)
		.range(offset, offset + 10);

	if (error) throw new Error("Error access to db.");
	return orders;
}
