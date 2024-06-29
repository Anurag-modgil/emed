import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative w-full h-64">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="text-gray-500 mt-2">{product.brand}</p>
        <p className="text-gray-900 font-bold mt-2">
          ₹{product.discountedPrice}
          <span className="text-gray-500 line-through ml-2">
            ₹{product.price}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;