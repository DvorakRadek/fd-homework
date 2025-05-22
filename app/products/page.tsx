import ProductList from "@/components/ProductList";
import WishlistSelected from "@/app/products/components/WishlistSelected";
import { fetchData } from "@/lib/fetchData";
import { Product } from "@/types";

const ProductsPage = async () => {
  
  const products: Product[] = await fetchData("products");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <WishlistSelected />
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Produkty</h3>
        {products.length === 0 
          ? <p className="text-gray-400 italic">Žádné produkty.</p>
          : <ProductList products={products} buttonText="Přidat do wishlistu" />
        }
      </div>
    </div>
  );
};

export default ProductsPage;