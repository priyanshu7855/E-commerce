import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PaymentForm from './PaymentForm';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export default function Checkout({ isOpen, onClose, onBack }: CheckoutProps) {
  const { state: cartState, clearCart } = useCart();
  const { state: authState } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: authState.user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  if (!isOpen) return null;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  if (orderComplete) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <button
                onClick={currentStep === 1 ? onBack : handlePrevious}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h2 className="text-lg font-semibold">Checkout</h2>
            </div>
            
            <div className="flex space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData('zipCode', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={formData.country}
                    onChange={(e) => updateFormData('country', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Payment Information</h3>
                
                <PaymentForm
                  amount={cartState.total * 1.08}
                  onSuccess={() => {
                    setOrderComplete(true);
                    clearCart();
                  }}
                  onError={(error) => {
                    console.error('Payment error:', error);
                  }}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  {cartState.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 py-2">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${cartState.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>${(cartState.total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>${(cartState.total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-6">
            {currentStep === 1 ? (
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            ) : currentStep === 3 ? (
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Place Order</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Review Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}