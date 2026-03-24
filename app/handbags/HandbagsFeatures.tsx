
'use client';

import { useEffect, useState } from 'react';

export default function HandbagsFeatures() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">Premium Customer Service</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to providing every customer with an exceptional shopping experience and comprehensive after-sales support
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className={`text-center p-8 bg-gray-50 hover:bg-gray-100 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-truck-line text-white w-10 h-10 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Global Shipping</h3>
            <p className="text-gray-600 leading-relaxed">
              Enjoy free worldwide shipping on orders over $100, typically delivered within 3-7 business days
            </p>
          </div>
          
          <div className={`text-center p-8 bg-gray-50 hover:bg-gray-100 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-arrow-go-back-line text-white w-10 h-10 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">30-Day Easy Returns</h3>
            <p className="text-gray-600 leading-relaxed">
              Hassle-free returns within 30 days of purchase, just keep original packaging and tags intact
            </p>
          </div>
          
          <div className={`text-center p-8 bg-gray-50 hover:bg-gray-100 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-tools-line text-white w-10 h-10 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lifetime Care & Repair</h3>
            <p className="text-gray-600 leading-relaxed">
              Professional leather care and repair services to keep your handbag looking brand new forever
            </p>
          </div>
          
          <div className={`text-center p-8 bg-gray-50 hover:bg-gray-100 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-shield-check-line text-white w-10 h-10 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Authenticity Guarantee</h3>
            <p className="text-gray-600 leading-relaxed">
              All products are 100% authentic with official certificates and anti-counterfeiting verification
            </p>
          </div>
          
          <div className={`text-center p-8 bg-gray-50 hover:bg-gray-100 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-customer-service-line text-white w-10 h-10 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Customer Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Professional support team available around the clock to assist with any product or order inquiries
            </p>
          </div>
          
          <div className={`text-center p-8 bg-gray-50 hover:bg-gray-100 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-vip-crown-line text-white w-10 h-10 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">VIP Member Exclusive</h3>
            <p className="text-gray-600 leading-relaxed">
              Registered members enjoy exclusive discounts, birthday gifts, and early access to new collections
            </p>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <div className="text-4xl font-black text-black">98%</div>
            <div className="text-gray-600 font-medium">Customer Satisfaction</div>
          </div>
          <div className="space-y-4">
            <div className="text-4xl font-black text-black">24H</div>
            <div className="text-gray-600 font-medium">Average Response Time</div>
          </div>
          <div className="space-y-4">
            <div className="text-4xl font-black text-black">5 Years</div>
            <div className="text-gray-600 font-medium">Quality Guarantee</div>
          </div>
        </div>
        
        <div className="mt-16 bg-black text-white p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Need Help?</h3>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Our professional team is always ready to help ensure you have the best shopping experience
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-lg font-bold">Live Chat</div>
              <div className="text-gray-300 text-sm">24/7 Online Support</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">Phone Support</div>
              <div className="text-gray-300 text-sm">1-800-LUXURY</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">Email Support</div>
              <div className="text-gray-300 text-sm">service@luxury.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
