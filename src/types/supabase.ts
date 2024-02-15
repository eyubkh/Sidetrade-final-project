export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			customer: {
				Row: {
					address_line_1: string | null;
					city: string | null;
					customer_id: number;
					customer_name: string | null;
					email: string | null;
					phone_number: string | null;
				};
				Insert: {
					address_line_1?: string | null;
					city?: string | null;
					customer_id: number;
					customer_name?: string | null;
					email?: string | null;
					phone_number?: string | null;
				};
				Update: {
					address_line_1?: string | null;
					city?: string | null;
					customer_id?: number;
					customer_name?: string | null;
					email?: string | null;
					phone_number?: string | null;
				};
				Relationships: [];
			};
			order_line: {
				Row: {
					order_id: number | null;
					order_line_id: number;
					product_id: number | null;
					quantity: number | null;
				};
				Insert: {
					order_id?: number | null;
					order_line_id: number;
					product_id?: number | null;
					quantity?: number | null;
				};
				Update: {
					order_id?: number | null;
					order_line_id?: number;
					product_id?: number | null;
					quantity?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "order_line_order_id_fkey";
						columns: ["order_id"];
						isOneToOne: false;
						referencedRelation: "orders";
						referencedColumns: ["order_id"];
					},
					{
						foreignKeyName: "order_line_product_id_fkey";
						columns: ["product_id"];
						isOneToOne: false;
						referencedRelation: "product";
						referencedColumns: ["product_id"];
					},
				];
			};
			order_satuts: {
				Row: {
					order_status_id: number;
					status_name: string | null;
				};
				Insert: {
					order_status_id: number;
					status_name?: string | null;
				};
				Update: {
					order_status_id?: number;
					status_name?: string | null;
				};
				Relationships: [];
			};
			orders: {
				Row: {
					customer_id: number | null;
					order_date: string | null;
					order_id: number;
					order_status_id: number | null;
					total_amount: number | null;
				};
				Insert: {
					customer_id?: number | null;
					order_date?: string | null;
					order_id: number;
					order_status_id?: number | null;
					total_amount?: number | null;
				};
				Update: {
					customer_id?: number | null;
					order_date?: string | null;
					order_id?: number;
					order_status_id?: number | null;
					total_amount?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "orders_customer_id_fkey";
						columns: ["customer_id"];
						isOneToOne: false;
						referencedRelation: "customer";
						referencedColumns: ["customer_id"];
					},
					{
						foreignKeyName: "orders_order_status_id_fkey";
						columns: ["order_status_id"];
						isOneToOne: false;
						referencedRelation: "order_satuts";
						referencedColumns: ["order_status_id"];
					},
				];
			};
			product: {
				Row: {
					cost_price: number | null;
					product_id: number;
					product_name: string | null;
					selling_price: number | null;
					image_url: string | null;
				};
				Insert: {
					cost_price?: number | null;
					product_id?: number;
					product_name?: string | null;
					selling_price?: number | null;
					image_url?: string | null;
				};
				Update: {
					cost_price?: number | null;
					product_id?: number;
					product_name?: string | null;
					selling_price?: number | null;
					image_url?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database["public"]["Tables"] & Database["public"]["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
				Database["public"]["Views"])
	  ? (Database["public"]["Tables"] &
				Database["public"]["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
		  }
			? R
			: never
	  : never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database["public"]["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
	  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
		  }
			? I
			: never
	  : never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database["public"]["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
	  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
		  }
			? U
			: never
	  : never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database["public"]["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
	  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
	  : never;
