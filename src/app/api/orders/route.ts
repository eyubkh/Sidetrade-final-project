import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const offset = Number(searchParams.get("offset"));

	console.log(offset);
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_KEY;
	if (!url || !key) return Response.json({ error: "Error access to db.s" });

	const supabase = createClient<Database>(url, key);

	const products = await getOrders(supabase, offset);
	return Response.json(products);
}

async function getOrders(supabase: SupabaseClient<Database>, offset: number) {
	const { data: products, error } = await supabase
		.from("order_line")
		.select(
			"*, order_id(*, customer_id(customer_id,customer_name ), order_status_id(status_name)), product_id(*) ",
		)
		.range(offset, offset + 10);
	if (error) throw new Error("Error access to db.");

	return products;
}
