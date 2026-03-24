
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cartStore } from '../lib/cartStore';

const watchCollection = [
  {
    id: 1,
    name: "Royal Oak Perpetual",
    brand: "Audemars Piguet",
    price: 94999,
    salePrice: 89999,
    image: "https://readdy.ai/api/search-image?query=Luxury%20dress%20watch%20with%20gold%20case%20and%20leather%20strap%2C%20elegant%20timepiece%20photography%20on%20premium%20white%20background%2C%20sophisticated%20watch%20product%20display%20with%20beautiful%20lighting%20and%20reflections%2C%20high-end%20jewelry%20photography%20style&width=400&height=400&seq=watch-dress-1&orientation=squarish",
    category: "dress",
    isNew: true,
    features: ["Perpetual Calendar", "Moon Phase", "Swiss Made"]
  },
  {
    id: 2,
    name: "Submariner Professional",
    brand: "Rolex",
    price: 14999,
    salePrice: 12999,
    image: "https://readdy.ai/api/search-image?query=Luxury%20diving%20watch%20with%20black%20ceramic%20bezel%20and%20steel%20bracelet%2C%20professional%20submarine%20timepiece%20on%20clean%20white%20background%2C%20premium%20watch%20photography%20with%20elegant%20lighting%20and%20sophisticated%20reflections%2C%20Swiss%20made%20diving%20watch%20showcase%20with%20detailed%20craftsmanship&width=400&height=400&seq=watch-diving-professional&orientation=squarish",
    category: "diving",
    features: ["Waterproof 300m", "Ceramic Bezel", "Automatic"]
  },
  {
    id: 3,
    name: "Speedmaster Racing",
    brand: "Omega",
    price: 7999,
    salePrice: 6999,
    image: "https://readdy.ai/api/search-image?query=Racing%20chronograph%20watch%20with%20black%20dial%20and%20steel%20case%2C%20professional%20sports%20timepiece%20photography%20on%20white%20background%2C%20luxury%20chronograph%20display%20with%20detailed%20subdials%2C%20premium%20watch%20product%20showcase&width=400&height=400&seq=watch-chrono-1&orientation=squarish",
    category: "chronograph",
    features: ["Chronograph", "Tachymeter", "Co-Axial"]
  },
  {
    id: 4,
    name: "Daytona Cosmograph",
    brand: "Rolex",
    price: 49999,
    salePrice: 45999,
    image: "https://readdy.ai/api/search-image?query=Luxury%20gold%20racing%20chronograph%20watch%20with%20white%20dial%2C%20premium%20sports%20timepiece%20on%20elegant%20white%20background%2C%20sophisticated%20watch%20photography%20with%20beautiful%20reflections%2C%20high-end%20luxury%20watch%20showcase&width=400&height=400&seq=watch-sport-1&orientation=squarish",
    category: "sport",
    isNew: true,
    features: ["Racing Chronograph", "Ceramic Bezel", "In-House Movement"]
  },
  {
    id: 5,
    name: "GMT-Master Explorer",
    brand: "Rolex",
    price: 17999,
    salePrice: 15999,
    image: "https://readdy.ai/api/search-image?query=GMT%20travel%20watch%20with%20dual%20timezone%20bezel%2C%20professional%20pilot%20timepiece%20photography%20on%20premium%20white%20background%2C%20luxury%20GMT%20watch%20display%20with%20colorful%20rotating%20bezel%2C%20Swiss%20travel%20watch%20showcase&width=400&height=400&seq=watch-gmt-1&orientation=squarish",
    category: "gmt",
    features: ["Dual Time Zone", "Ceramic Bezel", "Oyster Bracelet"]
  },
  {
    id: 6,
    name: "Nautilus Elegance",
    brand: "Patek Philippe",
    price: 129999,
    salePrice: 125999,
    image: "https://readdy.ai/api/search-image?query=Elegant%20luxury%20dress%20watch%20with%20blue%20dial%20and%20integrated%20bracelet%2C%20premium%20timepiece%20photography%20on%20sophisticated%20white%20background%2C%20high-end%20watch%20product%20display%20with%20beautiful%20details%2C%20Swiss%20luxury%20watch%20showcase&width=400&height=400&seq=watch-dress-2&orientation=squarish",
    category: "dress",
    isNew: true,
    features: ["Annual Calendar", "Moon Phase", "Hand Finished"]
  }
];

const categories = ['all', 'dress', 'sport', 'diving', 'chronograph', 'gmt'];

export default function WatchesGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [animatingButtons, setAnimatingButtons] = useState(new Set());
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [isClient, setIsClient] = useState(false);

  // 等待客户端水合完成
  useEffect(() => {
    setIsClient(true);
    // 初始化收藏列表状态
    const initialWishlist = new Set();
    watchCollection.forEach(product => {
      if (cartStore.isInWishlist(product.id.toString())) {
        initialWishlist.add(product.id.toString());
      }
    });
    setWishlistItems(initialWishlist);
    
    // 订阅收藏列表变化
    const unsubscribe = cartStore.subscribe(() => {
      const updatedWishlist = new Set();
      watchCollection.forEach(product => {
        if (cartStore.isInWishlist(product.id.toString())) {
          updatedWishlist.add(product.id.toString());
        }
      });
      setWishlistItems(updatedWishlist);
    });

    return unsubscribe;
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? watchCollection 
    : watchCollection.filter(item => item.category === selectedCategory);

  const handleAddToCart = (product) => {
    setAnimatingButtons(prev => new Set([...prev, `cart-${product.id}`]));
    
    cartStore.addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.salePrice,
      image: product.image,
      category: 'watches'
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
      category: 'watches'
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
    <section className="py-20 bg-gray-50" data-product-shop>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-black mb-4">PREMIUM COLLECTION</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of the world's finest luxury timepieces from prestigious Swiss manufacturers
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:z-10 relative cursor-pointer"
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex">
                {/* Image Section */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Sale Badge */}
                  {!product.isNew && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold">
                      {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                    </div>
                  )}

                  {/* New Badge */}
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold">
                      NEW
                    </div>
                  )}

                  {/* Quick Action Buttons */}
                  <div className={`absolute top-2 right-2 transition-opacity duration-300 ${
                    hoveredItem === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button 
                      onClick={() => handleAddToWishlist(product)}
                      className={`bg-white/90 hover:bg-white p-1.5 rounded-full shadow-lg transition-all duration-300 cursor-pointer transform ${
                        animatingButtons.has(`wishlist-${product.id}`) ? 'animate-bounce scale-125 bg-red-100' : 'hover:scale-110'
                      }`}
                      suppressHydrationWarning={true}
                    >
                      <i className={`w-4 h-4 flex items-center justify-center transition-colors ${
                        isClient && wishlistItems.has(product.id.toString()) ? 'ri-heart-fill text-red-600' : 'ri-heart-line'
                      } ${animatingButtons.has(`wishlist-${product.id}`) ? 'text-red-600' : ''}`} suppressHydrationWarning={true}></i>
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 font-medium">{product.brand}</div>
                    <h3 className="text-sm sm:text-lg font-bold text-black">{product.name}</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg sm:text-xl font-bold text-black">${product.salePrice.toLocaleString()}</span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">${product.price.toLocaleString()}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                        <i className="ri-check-line w-3 h-3 flex items-center justify-center text-green-600"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`w-full bg-black text-white py-2 px-3 text-xs sm:text-sm font-bold hover:bg-gray-800 transition-all duration-300 cursor-pointer whitespace-nowrap transform relative overflow-hidden ${
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
