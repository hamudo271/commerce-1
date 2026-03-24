
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://readdy.ai/api/search-image?query=Dark%20fashion%20newsletter%20background%20with%20multiple%20models%20in%20black%20outfits%2C%20dramatic%20lighting%2C%20professional%20fashion%20photography%2C%20moody%20atmosphere%20for%20subscription%20section&width=1920&height=600&seq=newsletter-bg&orientation=landscape"
          alt="Newsletter Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-5xl font-black text-white mb-6">
          GET EXCLUSIVE ACCESS
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Be the first to know about flash sales, new arrivals, and VIP-only Black Friday deals. 
          Subscribe now and get 15% off your first order!
        </p>

        <form onSubmit={handleSubscribe} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 text-lg border-0 bg-white/90 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-4 focus:ring-red-600/50"
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              {isSubscribed ? 'SUBSCRIBED!' : 'GET 15% OFF'}
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
            <span>No spam, unsubscribe anytime</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="ri-gift-line w-4 h-4 flex items-center justify-center"></i>
            <span>Exclusive member deals</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/contact">
            <button className="text-gray-400 hover:text-white transition-colors duration-300 text-sm underline cursor-pointer">
              Questions? Contact our team
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}