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

export async function POST(request: Request) {
	const res = await request.json();
	const { product_name, selling_price, cost_price } = res;

	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_KEY;
	if (!url || !key) return Response.json({ error: "Error access to db.s" });

	const supabase = createClient<Database>(url, key);

	const product = await addProduct(supabase, {
		product_name,
		selling_price: Number(selling_price),
		cost_price: Number(cost_price),
	});

	return Response.json(product);
}

async function addProduct(
	supabase: SupabaseClient<Database>,
	obj: { product_name: string; selling_price: number; cost_price: number },
) {
	const { data: product, error } = await supabase
		.from("product")
		.insert([obj])
		.select();
	if (error) throw new Error("Error access to db.");

	return product;
}
