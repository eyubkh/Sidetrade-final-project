import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export async function GET() {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_KEY;
	if (!url || !key) return Response.json({ error: "Error access to db.s" });

	const supabase = createClient<Database>(url, key);

	const products = await getProducts(supabase);
	return Response.json(products);
}

async function getProducts(supabase: SupabaseClient<Database>) {
	const { data: products, error } = await supabase.from("product").select();
	// .range(0, 9);
	if (error) throw new Error("Error access to db.");

	return products;
}
