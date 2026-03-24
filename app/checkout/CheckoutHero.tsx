
'use client';

import { useEffect } from 'react';

export default function CheckoutHero() {
  useEffect(() => {
    // Load Lottie player script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
    script.type = 'module';
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script on component unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <dotlottie-player 
              src="https://lottie.host/6df73453-6edb-4091-b264-97280388f130/nfilYZ7xhR.lottie" 
              background="transparent" 
              speed="1" 
              style={{width: '120px', height: '120px'}} 
              loop 
              autoplay>
            </dotlottie-player>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Secure Checkout</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Complete your purchase with our secure payment system. Your information is protected with industry-standard encryption and we guarantee safe transactions.
          </p>
          
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500 mb-8">
            <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
            <span>Takes less than 3 minutes to complete</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="ri-shield-check-line w-8 h-8 flex items-center justify-center text-green-600"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">SSL Encrypted</h3>
            <p className="text-sm text-gray-600">256-bit SSL encryption protects your personal and payment information</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="ri-lock-line w-8 h-8 flex items-center justify-center text-blue-600"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600">We accept all major credit cards and secure payment methods</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="ri-truck-line w-8 h-8 flex items-center justify-center text-purple-600"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Free shipping on orders over $100 with tracking included</p>
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <i className="ri-visa-fill w-8 h-8 flex items-center justify-center text-blue-600"></i>
              <span className="text-xs font-medium">Visa</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-mastercard-fill w-8 h-8 flex items-center justify-center text-red-600"></i>
              <span className="text-xs font-medium">Mastercard</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-bank-card-line w-8 h-8 flex items-center justify-center text-gray-600"></i>
              <span className="text-xs font-medium">American Express</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-paypal-line w-8 h-8 flex items-center justify-center text-blue-500"></i>
              <span className="text-xs font-medium">PayPal</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-apple-line w-8 h-8 flex items-center justify-center text-gray-800"></i>
              <span className="text-xs font-medium">Apple Pay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
