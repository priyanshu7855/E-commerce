import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { SortOption } from '../types';
import { categories, brands } from '../data/products';

interface FiltersProps {
  selectedCategory: string;
  selectedBrand: string;
  priceRange: [number, number];
  sortBy: SortOption;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSortChange: (sort: SortOption) => void;
}

export default function Filters({
  selectedCategory,
  selectedBrand,
  priceRange,
  sortBy,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brand
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">$</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
            />
            <span className="text-gray-400">to</span>
            <span className="text-sm text-gray-600">$</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          onCategoryChange('All');
          onBrandChange('All');
          onPriceRangeChange([0, 1000]);
          onSortChange('name');
        }}
        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}