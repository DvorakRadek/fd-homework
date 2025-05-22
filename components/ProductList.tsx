import { Product } from "@/types";
import ProductButton from "./ProductButton";

type ProductListProps = {
  products: Product[];
  buttonFn?: (product: Product) => void;
  buttonText: string;
};

const ProductList = ({ products, buttonFn, buttonText }: ProductListProps) => {
  return (
    <ul>
      {products.map((product) => (
        <li
          key={product.id}
          className="flex items-center justify-between border-b py-3 last:border-b-0"
        >
          <div>
            <span className="font-semibold">{product.name}</span>
            <span className="ml-2 text-gray-500">{product.price} Kč</span>
          </div>
          <ProductButton product={product} buttonText={buttonText} buttonFn={buttonFn} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;