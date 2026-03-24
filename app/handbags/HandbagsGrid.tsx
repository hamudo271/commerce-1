
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cartStore } from '../lib/cartStore';

const handbagProducts = [
  {
    id: 1,
    name: "Aria Tote Bag",
    brand: "Luxury Collection",
    category: "tote",
    price: 1599,
    salePrice: 1299,
    image: "https://readdy.ai/api/search-image?query=Luxury%20leather%20tote%20bag%20product%20photography%2C%20premium%20black%20handbag%20on%20white%20background%2C%20elegant%20fashion%20accessory%20styling%2C%20professional%20product%20photography&width=400&height=400&seq=handbag-tote1&orientation=squarish",
    colors: ["Black", "Brown", "Cognac"],
    isNew: true,
    features: ["Premium Leather", "Handcrafted Details", "Interior Pockets"]
  },
  {
    id: 2,
    name: "Bella Crossbody",
    brand: "Designer Series",
    category: "crossbody",
    price: 1199,
    salePrice: 899,
    image: "https://readdy.ai/api/search-image?query=Premium%20crossbody%20handbag%20product%20photography%2C%20elegant%20leather%20bag%20on%20white%20background%2C%20luxury%20fashion%20accessory%20styling%2C%20professional%20studio%20lighting&width=400&height=400&seq=handbag-cross1&orientation=squarish",
    colors: ["Black", "Nude", "Red"],
    isSale: true,
    features: ["Adjustable Strap", "Gold Hardware", "Compact Design"]
  },
  {
    id: 3,
    name: "Celeste Clutch",
    brand: "Evening Collection",
    category: "clutch",
    price: 799,
    salePrice: 599,
    image: "https://readdy.ai/api/search-image?query=Luxury%20evening%20clutch%20bag%20product%20photography%2C%20premium%20leather%20clutch%20on%20white%20background%2C%20elegant%20fashion%20accessory%20styling%2C%20professional%20product%20photography&width=400&height=400&seq=handbag-clutch1&orientation=squarish",
    colors: ["Black", "Gold", "Silver"],
    isNew: true,
    features: ["Evening Wear", "Chain Strap", "Elegant Finish"]
  },
  {
    id: 4,
    name: "Diana Satchel",
    brand: "Classic Line",
    category: "satchel",
    price: 1399,
    salePrice: 1099,
    image: "https://readdy.ai/api/search-image?query=Premium%20satchel%20handbag%20product%20photography%2C%20luxury%20leather%20bag%20on%20white%20background%2C%20elegant%20fashion%20accessory%20styling%2C%20professional%20studio%20lighting&width=400&height=400&seq=handbag-satchel1&orientation=squarish",
    colors: ["Black", "Navy", "Brown"],
    isSale: true,
    features: ["Structured Design", "Top Handle", "Professional Style"]
  },
  {
    id: 5,
    name: "Eva Shoulder Bag",
    brand: "Contemporary",
    category: "shoulder",
    price: 1249,
    salePrice: 949,
    image: "https://readdy.ai/api/search-image?query=Luxury%20shoulder%20bag%20product%20photography%2C%20premium%20leather%20handbag%20on%20white%20background%2C%20elegant%20fashion%20accessory%20styling%2C%20professional%20product%20photography&width=400&height=400&seq=handbag-shoulder1&orientation=squarish",
    colors: ["Black", "Tan", "Burgundy"],
    isNew: false,
    features: ["Versatile Style", "Comfort Strap", "Multiple Compartments"]
  },
  {
    id: 6,
    name: "Fiona Mini Bag",
    brand: "Trendy Collection",
    category: "mini",
    price: 929,
    salePrice: 729,
    image: "https://readdy.ai/api/search-image?query=Premium%20mini%20handbag%20product%20photography%2C%20luxury%20small%20leather%20bag%20on%20white%20background%2C%20elegant%20fashion%20accessory%20styling%2C%20professional%20studio%20lighting&width=400&height=400&seq=handbag-mini1&orientation=squarish",
    colors: ["Black", "Pink", "White"],
    isSale: true,
    features: ["Compact Size", "Trendy Design", "Day to Night"]
  }
];

const categories = ["all", "tote", "crossbody", "clutch", "satchel", "shoulder", "mini"];

export default function HandbagsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [animatingButtons, setAnimatingButtons] = useState(new Set());
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load wishlist state on client
    const initialWishlist = new Set(cartStore.getWishlistItems().map(item => item.id));
    setWishlistItems(initialWishlist);

    // Subscribe to wishlist changes
    const unsubscribe = cartStore.subscribe(() => {
      const currentWishlist = new Set(cartStore.getWishlistItems().map(item => item.id));
      setWishlistItems(currentWishlist);
    });

    return unsubscribe;
  }, []);

  const filteredProducts = selectedCategory === "all" 
    ? handbagProducts 
    : handbagProducts.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    setAnimatingButtons(prev => new Set([...prev, `cart-${product.id}`]));
    
    cartStore.addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.salePrice,
      image: product.image,
      category: 'handbags'
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
      category: 'handbags'
    };

    if (wishlistItems.has(product.id.toString())) {
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
    <section className="py-20 bg-gray-50" data-product-shop>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-black mb-4">PREMIUM COLLECTION</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of luxury handbags from world-renowned designers
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
              {category === "all" ? "all" : category}
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
                {product.isSale && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold">
                    {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                  </div>
                )}

                {/* New Badge */}
                {product.isNew && !product.isSale && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-sm font-bold">
                    NEW
                  </div>
                )}

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
                      isClient && wishlistItems.has(product.id.toString()) ? 'ri-heart-fill text-red-600' : 'ri-heart-line'
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
