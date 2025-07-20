import React, { useState } from 'react';
import { CreditCard, Lock, Calendar, Shield } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export default function PaymentForm({ 
  amount, 
  onSuccess, 
  onError, 
  isProcessing, 
  setIsProcessing 
}: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingZip: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Card number validation
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber = 'Invalid card number';
    }

    // Expiry date validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    // Name validation
    if (!formData.nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    // Billing ZIP validation
    if (!formData.billingZip.trim()) {
      newErrors.billingZip = 'Billing ZIP is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.billingZip)) {
      newErrors.billingZip = 'Invalid ZIP code format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setErrors({});

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Simulate different outcomes based on card number
      const cardNumber = formData.cardNumber.replace(/\s/g, '');
      
      if (cardNumber.startsWith('4000000000000002')) {
        throw new Error('Your card was declined. Please try a different payment method.');
      } else if (cardNumber.startsWith('4000000000000127')) {
        throw new Error('Your card\'s security code is incorrect.');
      } else if (cardNumber.startsWith('4000000000000069')) {
        throw new Error('Your card has expired.');
      } else {
        // Successful payment
        onSuccess();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    } else if (field === 'billingZip') {
      formattedValue = value.replace(/[^\d-]/g, '').substring(0, 10);
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Card';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Lock className="h-4 w-4 text-green-500" />
        <span className="text-sm text-gray-600">Secure SSL encrypted payment</span>
        <Shield className="h-4 w-4 text-green-500" />
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => updateFormData('cardNumber', e.target.value)}
            placeholder="1234 5678 9012 3456"
            className={`w-full pl-10 pr-20 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={19}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
            {getCardType(formData.cardNumber)}
          </div>
        </div>
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => updateFormData('expiryDate', e.target.value)}
              placeholder="MM/YY"
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={5}
            />
          </div>
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>

        {/* CVV */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          <input
            type="text"
            value={formData.cvv}
            onChange={(e) => updateFormData('cvv', e.target.value)}
            placeholder="123"
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cvv ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={4}
          />
          {errors.cvv && (
            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
          )}
        </div>
      </div>

      {/* Name on Card */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name on Card
        </label>
        <input
          type="text"
          value={formData.nameOnCard}
          onChange={(e) => updateFormData('nameOnCard', e.target.value)}
          placeholder="John Doe"
          className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.nameOnCard && (
          <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>
        )}
      </div>

      {/* Billing ZIP */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Billing ZIP Code
        </label>
        <input
          type="text"
          value={formData.billingZip}
          onChange={(e) => updateFormData('billingZip', e.target.value)}
          placeholder="12345"
          className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.billingZip ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.billingZip && (
          <p className="text-red-500 text-sm mt-1">{errors.billingZip}</p>
        )}
      </div>

      {/* Test Cards Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-blue-800 text-sm font-medium mb-1">Test Cards:</p>
        <p className="text-blue-700 text-xs">Success: 4242 4242 4242 4242</p>
        <p className="text-blue-700 text-xs">Declined: 4000 0000 0000 0002</p>
        <p className="text-blue-700 text-xs">Use any future date and any 3-digit CVV</p>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            <span>Pay ${amount.toFixed(2)}</span>
          </>
        )}
      </button>
    </form>
  );
}