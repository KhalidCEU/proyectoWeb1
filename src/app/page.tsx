import React from 'react';
import ProductCard from "@/components/ProductCard";
import testDataFile from "@/testJsons/items.json";

export default function Home() {
  const testData = testDataFile.items;

  return (
    <div className="container mx-auto px-4 mt-32">
      <h3 className="text-center text-2xl font-bold mb-8">Featured Items</h3>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {testData.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              description={product.description}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
