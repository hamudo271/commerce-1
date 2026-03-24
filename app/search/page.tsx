"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../components/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (keyword) {
      setIsLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(keyword)}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products || []);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [keyword]);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-black text-black mb-2">Search Results</h1>
        <p className="text-gray-500 mb-10">
          Showing results for: <span className="font-bold text-black text-lg">"{keyword}"</span>
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 border border-dashed border-gray-300">
            <i className="ri-search-line text-4xl text-gray-400 mb-4 block"></i>
            <h2 className="text-xl font-bold text-gray-600 mb-2">No exact matches found.</h2>
            <p className="text-sm text-gray-500">Try adjusting your search or browse our new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand || "HAOKAN"}
                price={product.price}
                imageUrl={product.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
