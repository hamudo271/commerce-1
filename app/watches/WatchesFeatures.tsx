
'use client';

import { useRef, useEffect, useState } from 'react';

const watchFeatures = [
  {
    icon: "ri-settings-3-line",
    title: "Swiss Movement",
    description: "Precision mechanical movements crafted by master horologists using centuries-old Swiss techniques and modern innovations."
  },
  {
    icon: "ri-shield-check-line", 
    title: "Lifetime Warranty",
    description: "Comprehensive protection and service support for your investment, backed by authorized service centers worldwide."
  },
  {
    icon: "ri-award-line",
    title: "Certified Authenticity",
    description: "Every timepiece comes with official certification papers and authenticity guarantee from authorized dealers."
  },
  {
    icon: "ri-truck-line",
    title: "White Glove Delivery",
    description: "Secure, insured delivery with signature confirmation and premium packaging for your luxury timepiece."
  },
  {
    icon: "ri-customer-service-2-line",
    title: "Concierge Service",
    description: "Dedicated personal shopping assistance and after-sales support from certified watch specialists."
  },
  {
    icon: "ri-exchange-line",
    title: "Trade-In Program",
    description: "Upgrade your collection with our exclusive trade-in program offering competitive valuations for luxury watches."
  }
];

export default function WatchesFeatures() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const refs = useRef([]);

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * 100);
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">PREMIUM SERVICES</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience unparalleled luxury service and support for your timepiece investment
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {watchFeatures.map((feature, index) => (
            <div
              key={feature.title}
              ref={el => refs.current[index] = el}
              className={`group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform ${
                visibleItems.has(index) 
                  ? 'translate-y-0 opacity-100 hover:-translate-y-2'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="space-y-6">
                <div className="w-16 h-16 bg-amber-100 group-hover:bg-amber-400 flex items-center justify-center transition-colors duration-300">
                  <i className={`${feature.icon} w-8 h-8 flex items-center justify-center text-2xl text-amber-600 group-hover:text-black transition-colors duration-300`}></i>
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-black mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <button className="text-amber-600 font-bold hover:text-amber-700 transition-colors duration-300 cursor-pointer">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Investment Value */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-black text-black mb-8">INVESTMENT TIMEPIECES</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-black text-amber-600">85%</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Value Retention</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-amber-600">12%</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Annual Appreciation</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-amber-600">Forever</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Heirloom Quality</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
