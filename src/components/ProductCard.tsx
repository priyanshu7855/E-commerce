import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product, ViewMode } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  viewMode: ViewMode;
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-48 sm:h-48 w-full h-64 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 line-clamp-3">{product.description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full shadow-md">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium">{product.brand}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center mb-4 space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.inStock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
}