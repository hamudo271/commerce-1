
'use client';

import { useState, useEffect } from 'react';

export default function CheckoutButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed bottom-8 right-8 z-40 opacity-0">
        <button className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl flex items-center space-x-3 whitespace-nowrap cursor-pointer">
          <i className="ri-shopping-cart-fill w-6 h-6 flex items-center justify-center"></i>
          <span>CHECKOUT NOW</span>
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`fixed bottom-8 right-8 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3 whitespace-nowrap cursor-pointer">
        <i className="ri-shopping-cart-fill w-6 h-6 flex items-center justify-center"></i>
        <span>CHECKOUT NOW</span>
        {cartCount > 0 && (
          <span className="bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
