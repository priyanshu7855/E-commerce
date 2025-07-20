import React from 'react';
import { Grid, List } from 'lucide-react';
import { Product, ViewMode, SortOption } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function ProductGrid({
  products,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}: ProductGridProps) {
  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>

        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort by Rating</option>
            <option value="newest">Newest First</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}