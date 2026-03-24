
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import CartDropdown from './CartDropdown';
import WishlistDropdown from './WishlistDropdown';
import { cartStore } from '../lib/cartStore';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [wishlistAnimation, setWishlistAnimation] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Initialize counts and subscribe to store changes
  useEffect(() => {
    // Set initial counts
    setCartItems(cartStore.getCartCount());
    setWishlistItems(cartStore.getWishlistCount());

    // Subscribe to store changes
    const unsubscribe = cartStore.subscribe(() => {
      const newCartCount = cartStore.getCartCount();
      const newWishlistCount = cartStore.getWishlistCount();
      
      // Trigger animations if counts changed
      if (newCartCount !== cartItems) {
        setCartAnimation(true);
        setTimeout(() => setCartAnimation(false), 600);
      }
      
      if (newWishlistCount !== wishlistItems) {
        setWishlistAnimation(true);
        setTimeout(() => setWishlistAnimation(false), 600);
      }
      
      setCartItems(newCartCount);
      setWishlistItems(newWishlistCount);
    });

    return () => { unsubscribe(); };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.cart-dropdown') && !target.closest('.cart-button')) {
        setIsCartOpen(false);
      }
      if (!target.closest('.wishlist-dropdown') && !target.closest('.wishlist-button')) {
        setIsWishlistOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayedCartItems = Number.isInteger(cartItems) && cartItems >= 0 ? cartItems : 0;
  const displayedWishlistItems = Number.isInteger(wishlistItems) && wishlistItems >= 0 ? wishlistItems : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="font-['Pacifico'] text-2xl text-white hover:text-red-400 transition-colors cursor-pointer"
            >
              logo
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); if(searchQuery.trim()) router.push(`/search?q=${encodeURIComponent(searchQuery)}`); setSearchQuery(''); }} className="relative mr-4 pl-4 border-l border-gray-700">
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value)} className="bg-transparent border-b border-gray-600 text-white px-2 py-1 focus:outline-none focus:border-red-500 text-sm w-48 transition-colors placeholder-gray-400" />
                <button type="submit" className="absolute right-0 top-1 text-gray-400 hover:text-white cursor-pointer transition-colors"><i className="ri-search-line"></i></button>
              </form>

              <Link
                href="/"
                className="font-medium text-white hover:text-red-600 transition-colors cursor-pointer"
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="font-medium text-white hover:text-red-600 transition-colors cursor-pointer"
              >
                Collections
              </Link>
              <Link
                href="/handbags"
                className="font-medium text-white hover:text-red-600 transition-colors cursor-pointer"
              >
                Handbags
              </Link>
              <Link
                href="/sunglasses"
                className="font-medium text-white hover:text-red-600 transition-colors cursor-pointer"
              >
                Sunglasses
              </Link>
              <Link
                href="/watches"
                className="font-medium text-white hover:text-red-600 transition-colors cursor-pointer"
              >
                Watches
              </Link>
              <Link
                href="/contact"
                className="font-medium text-white hover:text-red-600 transition-colors cursor-pointer"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* User Account / Auth */}
            <div className="relative flex items-center mr-2">
              {session ? (
                <div className="flex items-center space-x-3">
                  <Link href="/mypage" className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer border-r border-gray-700 pr-3">
                    My Page
                  </Link>
                  <button onClick={() => signOut()} className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer border-r border-gray-700 pr-3">
                    Login
                  </Link>
                  <Link href="/register" className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <div className="relative wishlist-dropdown">
              <button 
                onClick={() => {
                  setIsWishlistOpen(!isWishlistOpen);
                  setIsCartOpen(false);
                }}
                className={`wishlist-button text-gray-300 hover:text-white p-2 relative transition-all duration-300 cursor-pointer ${
                  wishlistAnimation ? 'animate-bounce scale-110' : ''
                }`}
              >
                <i className={`w-5 h-5 flex items-center justify-center ${
                  displayedWishlistItems > 0 ? 'ri-heart-fill text-red-500' : 'ri-heart-line'
                }`}></i>
                {displayedWishlistItems > 0 && (
                  <span className={`absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center transition-all duration-300 ${
                    wishlistAnimation ? 'animate-pulse scale-125' : ''
                  }`}>
                    {displayedWishlistItems}
                  </span>
                )}
                {wishlistAnimation && (
                  <div className="absolute inset-0 bg-red-600/30 rounded-full animate-ping"></div>
                )}
              </button>
              <WishlistDropdown isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
            </div>

            {/* Shopping Cart */}
            <div className="relative cart-dropdown">
              <button 
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsWishlistOpen(false);
                }}
                className={`cart-button text-gray-300 hover:text-white p-2 relative transition-all duration-300 cursor-pointer ${
                  cartAnimation ? 'animate-bounce scale-110' : ''
                }`}
              >
                <i className="ri-shopping-bag-line w-5 h-5 flex items-center justify-center"></i>
                {displayedCartItems > 0 && (
                  <span className={`absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                    cartAnimation ? 'animate-pulse scale-125' : ''
                  }`}>
                    {displayedCartItems}
                  </span>
                )}
                {cartAnimation && (
                  <div className="absolute inset-0 bg-red-600/30 rounded-full animate-ping"></div>
                )}
              </button>
              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-300 hover:text-white p-2 transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <i
                className={`${
                  isMenuOpen ? 'ri-close-line' : 'ri-menu-line'
                } w-5 h-5 flex items-center justify-center`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-sm">
            <nav className="py-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/handbags"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Handbags
              </Link>
              <Link
                href="/sunglasses"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Sunglasses
              </Link>
              <Link
                href="/watches"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Watches
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Action Buttons */}
              <div className="px-4 py-3 border-t border-gray-800 mt-4">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded font-bold hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View Cart ({displayedCartItems})
                  </button>
                  <button 
                    onClick={() => {
                      setIsWishlistOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 border border-white text-white py-2 px-4 rounded font-bold hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Wishlist ({displayedWishlistItems})
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
