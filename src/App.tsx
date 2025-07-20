import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import { products } from './data/products';
import { Product, ViewMode, SortOption } from './types';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming higher IDs are newer
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header onSearch={setSearchQuery} />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="lg:w-64 flex-shrink-0">
                <Filters
                  selectedCategory={selectedCategory}
                  selectedBrand={selectedBrand}
                  priceRange={priceRange}
                  sortBy={sortBy}
                  onCategoryChange={setSelectedCategory}
                  onBrandChange={setSelectedBrand}
                  onPriceRangeChange={setPriceRange}
                  onSortChange={setSortBy}
                />
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                <ProductGrid
                  products={filteredAndSortedProducts}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </div>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;