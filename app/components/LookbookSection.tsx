
'use client';

import { useEffect, useRef, useState } from 'react';

export default function LookbookSection() {
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

  const services = [
    {
      icon: "ri-truck-line",
      title: "Free Global Shipping",
      description: "Free worldwide shipping on orders over $100, delivered within 3-7 business days"
    },
    {
      icon: "ri-arrow-go-back-line",
      title: "30-Day Easy Returns",
      description: "Hassle-free returns within 30 days, just keep original packaging and tags"
    },
    {
      icon: "ri-tools-line",
      title: "Lifetime Maintenance",
      description: "Professional leather care and repair services to keep your bags looking new"
    },
    {
      icon: "ri-shield-check-line",
      title: "Authenticity Guarantee",
      description: "All products are 100% authentic with official certification and anti-counterfeit labels"
    },
    {
      icon: "ri-customer-service-line",
      title: "24/7 Customer Service",
      description: "Professional support team available around the clock for product and order inquiries"
    },
    {
      icon: "ri-vip-crown-line",
      title: "VIP Member Benefits",
      description: "Exclusive discounts, birthday gifts, and priority access to new collections for members"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">Premium After-Sales Service</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to providing every customer with exceptional shopping experience and comprehensive after-sales support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => refs.current[index] = el}
              className={`text-center p-8 bg-gray-50 hover:bg-gray-100 transition-all duration-500 ${
                visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`${service.icon} text-white w-10 h-10 flex items-center justify-center`}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
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
            Our professional team is always ready to help ensure you get the best shopping experience
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-lg font-bold">Live Chat</div>
              <div className="text-gray-300 text-sm">24/7 Online Support</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">Phone Support</div>
              <div className="text-gray-300 text-sm">1-800-LUXURY-1</div>
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
