import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const id = Number(params.id);
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_KEY;
	if (!url || !key) return Response.json({ error: "Error access to db.s" });

	const supabase = createClient<Database>(url, key);

	const products = await deleteProduct(supabase, id);
	return Response.json(products);
}

async function deleteProduct(supabase: SupabaseClient<Database>, id: number) {
	const { error } = await supabase
		.from("product")
		.delete()
		.eq("product_id", id);

	if (error) throw new Error("Error access to db.");

	return { success: true, id };
}
