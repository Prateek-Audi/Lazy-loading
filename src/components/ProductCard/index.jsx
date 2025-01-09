import React from "react";

const ProductCard = ({ product }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:scale-105 transform transition-all duration-300 cursor-pointer">
    <div className="relative">
      <img
        src={product.productImageUrl}
        alt={product.productName}
        className="w-full h-56 object-cover"
        loading="lazy"
      />
      {product.stock && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs">
          +{product.stock}
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 truncate">
        {product.productName}
      </h3>
      <p className="text-sm text-gray-500 mt-1 truncate">
        {product.description || "Premium Quality Item"}
      </p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-900 font-medium">
          €{(product.price || 99.99).toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-gray-500 line-through text-sm">
            €{product.originalPrice}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default ProductCard;
