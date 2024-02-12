import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export async function GET() {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_KEY;
	if (!url || !key) return Response.json({ error: "Error access to db.s" });

	const supabase = createClient<Database>(url, key);

	const products = await getOrders(supabase);
	return Response.json(products);
}

async function getOrders(supabase: SupabaseClient<Database>) {
	const { data: products, error } = await supabase
		.from("order_line")
		.select(
			"*, order_id(*, customer_id(customer_id,customer_name ), order_status_id(status_name)), product_id(*) ",
		);
	if (error) throw new Error("Error access to db.");

	return products;
}
