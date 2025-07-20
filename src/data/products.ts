import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    description: 'High-quality wireless headphones with active noise cancellation and premium audio drivers for an immersive listening experience.',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    brand: 'TechAudio',
    rating: 4.8,
    reviews: 342,
    inStock: true,
    features: ['Active Noise Cancellation', '30-hour Battery', 'Quick Charge', 'Premium Materials'],
    tags: ['wireless', 'premium', 'music']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    description: 'Advanced fitness tracking watch with heart rate monitoring, GPS, and smart notifications.',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    brand: 'FitTech',
    rating: 4.6,
    reviews: 128,
    inStock: true,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Smart Notifications'],
    tags: ['fitness', 'smart', 'health']
  },
  {
    id: '3',
    name: 'Professional Camera Lens',
    price: 899.99,
    description: 'High-performance telephoto lens perfect for professional photography and videography.',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Photography',
    brand: 'LensMax',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    features: ['70-200mm Zoom', 'Image Stabilization', 'Weather Sealed', 'Fast Autofocus'],
    tags: ['photography', 'professional', 'lens']
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    originalPrice: 599.99,
    description: 'Premium ergonomic office chair designed for comfort and productivity during long work sessions.',
    image: 'https://images.pexels.com/photos/586958/pexels-photo-586958.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Furniture',
    brand: 'ComfortDesk',
    rating: 4.7,
    reviews: 256,
    inStock: true,
    features: ['Lumbar Support', 'Adjustable Height', 'Breathable Mesh', '5-Year Warranty'],
    tags: ['office', 'ergonomic', 'comfort']
  },
  {
    id: '5',
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    description: 'High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.',
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Gaming',
    brand: 'GamePro',
    rating: 4.5,
    reviews: 432,
    inStock: true,
    features: ['12000 DPI', 'RGB Lighting', 'Programmable Buttons', 'Low Latency'],
    tags: ['gaming', 'wireless', 'precision']
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 149.99,
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    brand: 'SoundWave',
    rating: 4.4,
    reviews: 198,
    inStock: true,
    features: ['360° Sound', 'Waterproof', '12-hour Battery', 'Voice Assistant'],
    tags: ['portable', 'waterproof', 'music']
  },
  {
    id: '7',
    name: 'Smart Home Security Camera',
    price: 249.99,
    description: 'AI-powered security camera with night vision, motion detection, and cloud storage.',
    image: 'https://images.pexels.com/photos/2346366/pexels-photo-2346366.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Smart Home',
    brand: 'SecureVision',
    rating: 4.6,
    reviews: 174,
    inStock: true,
    features: ['4K Resolution', 'Night Vision', 'AI Detection', 'Cloud Storage'],
    tags: ['security', 'smart', 'monitoring']
  },
  {
    id: '8',
    name: 'Mechanical Keyboard',
    price: 189.99,
    description: 'Premium mechanical keyboard with customizable switches and RGB backlighting.',
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Gaming',
    brand: 'KeyCraft',
    rating: 4.8,
    reviews: 367,
    inStock: true,
    features: ['Mechanical Switches', 'RGB Backlighting', 'Programmable Keys', 'USB-C'],
    tags: ['mechanical', 'gaming', 'customizable']
  }
];

export const categories = [
  'All',
  'Electronics',
  'Photography',
  'Furniture',
  'Gaming',
  'Smart Home'
];

export const brands = [
  'All',
  'TechAudio',
  'FitTech',
  'LensMax',
  'ComfortDesk',
  'GamePro',
  'SoundWave',
  'SecureVision',
  'KeyCraft'
];