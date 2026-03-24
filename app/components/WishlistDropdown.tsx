'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cartStore, WishlistItem } from '../lib/cartStore';

interface WishlistDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDropdown({ isOpen, onClose }: WishlistDropdownProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    // Load initial wishlist items
    setWishlistItems(cartStore.getWishlistItems());

    // Subscribe to wishlist changes
    const unsubscribe = cartStore.subscribe(() => {
      setWishlistItems(cartStore.getWishlistItems());
    });

    return unsubscribe;
  }, []);

  const removeFromWishlist = (id: string) => {
    cartStore.removeFromWishlist(id);
  };

  const addToCart = (item: WishlistItem) => {
    cartStore.addToCart(item);
    removeFromWishlist(item.id);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 animate-in slide-in-from-top-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Wishlist</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="max-h-64 overflow-y-auto">
        {wishlistItems.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <i className="ri-heart-line w-12 h-12 flex items-center justify-center mx-auto mb-3 text-gray-300"></i>
            <p>Your wishlist is empty</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                  <p className="text-red-600 font-bold text-sm">${item.price}</p>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 flex items-center justify-center bg-black text-white hover:bg-gray-800 rounded transition-colors cursor-pointer"
                    title="Add to cart"
                  >
                    <i className="ri-shopping-cart-line text-sm"></i>
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-red-600 text-white hover:bg-red-700 rounded transition-colors cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <i className="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {wishlistItems.length > 0 && (
        <div className="border-t border-gray-200 p-4">
          <Link
            href="/wishlist"
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-bold hover:bg-gray-50 transition-colors cursor-pointer block text-center whitespace-nowrap"
            onClick={onClose}
          >
            View Full Wishlist
          </Link>
        </div>
      )}
    </div>
  );
}