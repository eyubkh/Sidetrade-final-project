import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const id = params.id;
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_KEY;
	if (!url || !key) return Response.json({ error: "Error access to db.s" });

	const supabase = createClient<Database>(url, key);

	const products = await getOrder(supabase, id);
	return Response.json(products);
}

async function getOrder(supabase: SupabaseClient<Database>, id: string) {
	const { data: order, error } = await supabase
		.from("order_line")
		.select("*, order_id(*, order_status_id(*), customer_id(*)), product_id(*)")
		.eq("order_line_id", id);
	if (error) throw new Error("Error access to db.");

	return order;
}
