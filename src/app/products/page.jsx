import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-4xl font-bold text-center mb-3">
        All Products
      </h1>

      <p className="text-center text-gray-400 mb-10">
        Browse all available products.
      </p>

      <ProductList />

    </div>
  );
}