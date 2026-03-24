
'use client';

import { useEffect, useRef, useState } from 'react';
import ReviewModal from './ReviewModal';

const reviews = [
  {
    id: 1,
    text: "Amazing Black Friday deals! The quality is outstanding and delivery was super fast.",
    rating: 5,
    name: "Sarah Johnson",
    title: "Fashion Enthusiast"
  },
  {
    id: 2,
    text: "Best shopping experience ever! The discounts are real and the products are exactly as described.",
    rating: 5,
    name: "Michael Chen",
    title: "Regular Customer"
  },
  {
    id: 3,
    text: "I saved so much money during this Black Friday sale. Highly recommend this store!",
    rating: 5,
    name: "Emma Davis",
    title: "Style Blogger"
  },
  {
    id: 4,
    text: "Premium quality at unbeatable prices. This is my go-to store for luxury fashion.",
    rating: 5,
    name: "James Wilson",
    title: "Fashion Designer"
  }
];

export default function CustomerReviews() {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const refs = useRef([]);

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => new Set([...prev, index]));
            }, index * 200);
          }
        },
        { threshold: 0.5 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <div className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-center mb-16 text-white">CUSTOMER REVIEWS</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              ref={el => refs.current[index] = el}
              className={`bg-gray-900 p-6 border border-gray-800 transition-all duration-500 ${
                visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-red-600 w-5 h-5 flex items-center justify-center"></i>
                ))}
              </div>
              
              <p className="text-gray-300 mb-4 line-clamp-3">"{review.text}"</p>
              
              <div>
                <h4 className="font-bold text-white">{review.name}</h4>
                <p className="text-sm text-gray-400">{review.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition-colors duration-300 whitespace-nowrap cursor-pointer"
          >
            Read More Reviews
          </button>
        </div>
      </div>
      
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
