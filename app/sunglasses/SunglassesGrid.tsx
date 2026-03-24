
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cartStore } from '../lib/cartStore';

const sunglassesCollection = [
  {
    id: 1,
    name: "Aviator Classic",
    brand: "Ray-Ban",
    price: 199,
    salePrice: 149,
    image: "https://readdy.ai/api/search-image?query=Classic%20aviator%20sunglasses%20on%20white%20background%2C%20professional%20product%20photography%2C%20premium%20eyewear%20styling%2C%20clean%20minimalist%20composition&width=400&height=400&seq=aviator-1&orientation=squarish",
    category: "aviator",
    features: ["UV400 Protection", "Polarized Lenses", "Metal Frame"]
  },
  {
    id: 2,
    name: "Wayfarer Retro",
    brand: "Ray-Ban",
    price: 179,
    salePrice: 134,
    image: "https://readdy.ai/api/search-image?query=Retro%20wayfarer%20sunglasses%20on%20white%20background%2C%20vintage%20style%20eyewear%20photography%2C%20classic%20black%20frame%20design%2C%20professional%20product%20shot&width=400&height=400&seq=wayfarer-1&orientation=squarish",
    category: "wayfarer",
    features: ["Classic Design", "Acetate Frame", "UV Protection"]
  },
  {
    id: 3,
    name: "Round Vintage",
    brand: "Oliver Peoples",
    price: 289,
    salePrice: 217,
    image: "https://readdy.ai/api/search-image?query=Round%20vintage%20sunglasses%20on%20white%20background%2C%20retro%20circular%20eyewear%20design%2C%20premium%20metal%20frame%20photography%2C%20artistic%20product%20styling&width=400&height=400&seq=round-1&orientation=squarish",
    category: "round",
    features: ["Vintage Style", "Titanium Frame", "Gradient Lenses"]
  },
  {
    id: 4,
    name: "Sport Active",
    brand: "Oakley",
    price: 159,
    salePrice: 119,
    image: "https://readdy.ai/api/search-image?query=Sport%20sunglasses%20on%20white%20background%2C%20athletic%20eyewear%20design%2C%20wraparound%20style%20frame%2C%20professional%20product%20photography&width=400&height=400&seq=sport-1&orientation=squarish",
    category: "sport",
    features: ["Wraparound Design", "Impact Resistant", "Non-Slip Grip"]
  },
  {
    id: 5,
    name: "Cat Eye Glam",
    brand: "Gucci",
    price: 349,
    salePrice: 262,
    image: "https://readdy.ai/api/search-image?query=Cat%20eye%20sunglasses%20on%20white%20background%2C%20glamorous%20feminine%20eyewear%20design%2C%20luxury%20fashion%20accessory%20photography%2C%20elegant%20styling&width=400&height=400&seq=cateye-1&orientation=squarish",
    category: "fashion",
    features: ["Cat Eye Shape", "Luxury Materials", "Designer Details"]
  },
  {
    id: 6,
    name: "Pilot Pro",
    brand: "Tom Ford",
    price: 399,
    salePrice: 299,
    image: "https://readdy.ai/api/search-image?query=Pilot%20style%20sunglasses%20on%20white%20background%2C%20premium%20luxury%20eyewear%20photography%2C%20sophisticated%20metal%20frame%20design%2C%20high-end%20product%20styling&width=400&height=400&seq=pilot-1&orientation=squarish",
    category: "aviator",
    features: ["Premium Lenses", "Gold Accents", "Luxury Packaging"]
  }
];

const categories = ['all', 'aviator', 'wayfarer', 'round', 'sport', 'fashion'];

export default function SunglassesGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [animatingButtons, setAnimatingButtons] = useState(new Set());

  const filteredProducts = selectedCategory === 'all' 
    ? sunglassesCollection 
    : sunglassesCollection.filter(item => item.category === selectedCategory);

  const handleAddToCart = (product) => {
    setAnimatingButtons(prev => new Set([...prev, `cart-${product.id}`]));
    
    // Add to global cart store
    cartStore.addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.salePrice,
      image: product.image,
      category: 'sunglasses'
    });
    
    setTimeout(() => {
      setAnimatingButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(`cart-${product.id}`);
        return newSet;
      });
    }, 600);
  };

  const handleAddToWishlist = (product) => {
    setAnimatingButtons(prev => new Set([...prev, `wishlist-${product.id}`]));
    
    const productItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.salePrice,
      image: product.image,
      category: 'sunglasses'
    };

    if (cartStore.isInWishlist(product.id.toString())) {
      cartStore.removeFromWishlist(product.id.toString());
    } else {
      cartStore.addToWishlist(productItem);
    }
    
    setTimeout(() => {
      setAnimatingButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(`wishlist-${product.id}`);
        return newSet;
      });
    }, 600);
  };

  return (
    <section id="premium-collection" className="py-20 bg-gray-50" data-product-shop>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-black mb-4">PREMIUM COLLECTION</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of luxury sunglasses from world-renowned brands
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:z-10 relative cursor-pointer"
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold">
                  {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                </div>

                {/* Quick Action Buttons */}
                <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-opacity duration-300 ${
                  hoveredItem === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button 
                    onClick={() => handleAddToWishlist(product)}
                    className={`bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 cursor-pointer transform ${
                      animatingButtons.has(`wishlist-${product.id}`) ? 'animate-bounce scale-125 bg-red-100' : 'hover:scale-110'
                    }`}
                  >
                    <i className={`w-5 h-5 flex items-center justify-center transition-colors ${
                      cartStore.isInWishlist(product.id.toString()) ? 'ri-heart-fill text-red-600' : 'ri-heart-line'
                    } ${animatingButtons.has(`wishlist-${product.id}`) ? 'text-red-600' : ''}`}></i>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="text-sm text-gray-500 font-medium">{product.brand}</div>
                  <h3 className="text-xl font-bold text-black">{product.name}</h3>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-black">${product.salePrice}</span>
                  <span className="text-lg text-gray-500 line-through">${product.price}</span>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-600"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleAddToCart(product)}
                  className={`w-full bg-black text-white py-3 font-bold hover:bg-gray-800 transition-all duration-300 cursor-pointer whitespace-nowrap transform relative overflow-hidden ${
                    animatingButtons.has(`cart-${product.id}`) ? 'animate-pulse scale-105' : 'hover:scale-105'
                  }`}
                >
                  {animatingButtons.has(`cart-${product.id}`) && (
                    <div className="absolute inset-0 bg-green-600 animate-ping opacity-30"></div>
                  )}
                  <span className="relative z-10">
                    {animatingButtons.has(`cart-${product.id}`) ? 'ADDING...' : 'ADD TO CART'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
