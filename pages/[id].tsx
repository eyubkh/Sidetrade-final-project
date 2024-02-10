import { useRouter } from "next/dist/client/router";
import Product from "../components/product";
import { IProduct } from "../models/product";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const product: IProduct = {
    productId: Number(id),
    productName: `Product ${id}`,
    sellingPrice: 10,
    category: 1,
    image: 0,
  };

  return (
    <main className="px-10 py-6 flex flex-col flex-1">
      <Product {...product} />
    </main>
  );
}
