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
        "https://api.jsonbin.io/v3/qs/67804804ad19ca34f8e87fe8"
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      const { record } = data;
      setProducts((prev) => {
        const uniqueIds = new Set(prev.map((p) => p.id));
        const uniqueNewProducts = record.filter((p) => !uniqueIds.has(p.id));
        return [...prev, ...uniqueNewProducts];
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

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
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Get Inspired</h1>
      <p className="text-lg text-gray-600 mb-8">
        Browsing for your next long-haul trip, everyday journey, or just fancy a
        look at what's new? From community favourites to about-to-sell-out
        items, see them all here.
      </p>

      <div className="mb-8 flex flex-wrap gap-4">
        <select className="appearance-none px-4 py-2 border rounded-lg bg-white">
          <option>All Categories</option>
          <option>Backpacks</option>
          <option>Accessories</option>
        </select>
        <select className="appearance-none px-4 py-2 border rounded-lg bg-white">
          <option>All Colors</option>
          <option>Black</option>
          <option>Yellow</option>
        </select>
        <select className="appearance-none px-4 py-2 border rounded-lg bg-white">
          <option>All Features</option>
          <option>Waterproof</option>
          <option>Eco-friendly</option>
        </select>
        <input
          type="range"
          min="0"
          max="1000"
          className="slider w-48"
          title="Price Range"
        />
        <select className="appearance-none px-4 py-2 border rounded-lg bg-white">
          <option>Sort by</option>
          <option>New In</option>
          <option>Price: Low to High</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
