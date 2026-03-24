
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-['Pacifico'] text-3xl font-bold">logo</div>
            <p className="text-gray-300 text-base max-w-md">
              Premium fashion and luxury accessories for the modern lifestyle. Discover our curated collection of handbags, sunglasses, and watches.
            </p>
            <div className="flex space-x-4 pt-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-facebook-fill text-gray-300 hover:text-white transition-colors cursor-pointer"></i>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-instagram-line text-gray-300 hover:text-white transition-colors cursor-pointer"></i>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-twitter-x-line text-gray-300 hover:text-white transition-colors cursor-pointer"></i>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-youtube-line text-gray-300 hover:text-white transition-colors cursor-pointer"></i>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Shop Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/handbags" className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm">
                  Handbags
                </Link>
              </li>
              <li>
                <Link href="/sunglasses" className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/watches" className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm">
                  Watches
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm">
                  All Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm">
                  Contact Us
                </Link>
              </li>
              <li><div className="text-gray-300 cursor-pointer hover:text-white transition-colors text-sm">Help Center</div></li>
              <li><div className="text-gray-300 cursor-pointer hover:text-white transition-colors text-sm">Size Guide</div></li>
              <li><div className="text-gray-300 cursor-pointer hover:text-white transition-colors text-sm">Returns & Exchanges</div></li>
              <li><div className="text-gray-300 cursor-pointer hover:text-white transition-colors text-sm">Shipping Info</div></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm">Subscribe to get special offers and updates</p>
            </div>
            <div className="flex gap-2 max-w-md w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-white focus:outline-none text-sm"
              />
              <button className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Fashion Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
