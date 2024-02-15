export interface IProduct {
	product_id: number;
	product_name: string;
	selling_price: number;
	cost_price: number;
	image_url: string;
}

export interface IOrder {
	order_date: string;
	customer_id: {
		customer_name: string;
		email: string;
		address_line_1: string;
		city: string;
		phone_number: string;
	};
	total_amount: number;
	order_date: string;
	order_status_id: {
		status_name: string;
	};
}

export interface IOrderLine {
	product_id: IProduct;
	order_line_id: number;
	quantity: number;
	order_id: IOrder;
}
