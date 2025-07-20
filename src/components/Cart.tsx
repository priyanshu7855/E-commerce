import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Checkout from './Checkout';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { state, updateQuantity, removeItem } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  if (showCheckout) {
    return (
      <Checkout
        isOpen={true}
        onClose={() => {
          setShowCheckout(false);
          onClose();
        }}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {state.itemCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add some items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-red-400 hover:text-red-600 transition-colors ml-2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>Proceed to Checkout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}