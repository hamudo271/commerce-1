
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cartStore, CartItem } from '../lib/cartStore';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load initial cart items
    setCartItems(cartStore.getCartItems());

    // Subscribe to cart changes
    const unsubscribe = cartStore.subscribe(() => {
      setCartItems(cartStore.getCartItems());
    });

    return unsubscribe;
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id: string, newQuantity: number) => {
    cartStore.updateCartQuantity(id, newQuantity);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 animate-in slide-in-from-top-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
        </button>
      </div>

      {/* Cart Items */}
      <div className="max-h-64 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <i className="ri-shopping-cart-line w-12 h-12 flex items-center justify-center mx-auto mb-3 text-gray-300"></i>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                  <p className="text-red-600 font-bold text-sm">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors cursor-pointer"
                  >
                    <i className="ri-subtract-line text-xs"></i>
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors cursor-pointer"
                  >
                    <i className="ri-add-line text-xs"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="border-t border-gray-200 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-red-600">${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer block text-center whitespace-nowrap"
            onClick={onClose}
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
