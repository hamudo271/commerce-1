
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FeatureBanner() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "ri-truck-line",
      title: "FREE SHIPPING",
      description: "On all orders over $100"
    },
    {
      icon: "ri-shield-check-line", 
      title: "SECURE PAYMENT",
      description: "100% secure transactions"
    },
    {
      icon: "ri-exchange-line",
      title: "EASY RETURNS",
      description: "30-day return policy"
    },
    {
      icon: "ri-customer-service-line",
      title: "24/7 SUPPORT", 
      description: "Expert customer service"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="bg-red-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 overflow-hidden">
          {/* Mobile - Single Feature Rotating */}
          <div className="md:hidden">
            <div className="flex items-center space-x-3 text-center">
              <i className={`${features[currentFeature].icon} w-6 h-6 flex items-center justify-center`}></i>
              <div>
                <span className="font-bold text-sm">{features[currentFeature].title}</span>
                <span className="text-xs ml-2">{features[currentFeature].description}</span>
              </div>
            </div>
          </div>

          {/* Desktop - All Features */}
          <div className="hidden md:grid grid-cols-4 gap-8 w-full">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 justify-center"
              >
                <i className={`${feature.icon} w-6 h-6 flex items-center justify-center`}></i>
                <div className="text-center">
                  <div className="font-bold text-sm">{feature.title}</div>
                  <div className="text-xs opacity-90">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}