import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";

const ProductCard = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("../ProductCard")), 1000)
    )
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState(8);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://api.jsonbin.io/v3/qs/67803493ad19ca34f8e877c0"
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      const { record } = data;
      setProducts((prev) => [...prev, ...record]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - 200) {
        if (visibleProducts < products.length) {
          setVisibleProducts((prev) => Math.min(prev + 8, products.length));
        } else if (!loading && products.length % 48 === 0) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [products.length, visibleProducts, loading]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, visibleProducts).map((product) => (
          <Suspense
            key={product.id}
            fallback={
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            }
          >
            <ProductCard product={product} />
          </Suspense>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default ProductList;
