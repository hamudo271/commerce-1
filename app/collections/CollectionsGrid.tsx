
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cartStore } from '../lib/cartStore';

const allProducts = [
  // Outerwear Category
  {
    id: 1,
    name: "Arctic Puffer Coat",
    brand: "Winter Elite",
    price: 499,
    salePrice: 399,
    image: "https://readdy.ai/api/search-image?query=Luxury%20winter%20puffer%20coat%20on%20white%20background%2C%20premium%20down%20jacket%20photography%2C%20sophisticated%20outerwear%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=winter-coat-1&orientation=squarish",
    category: "outerwear",
    features: ["Water Resistant", "Down Insulation", "Hood Included"]
  },
  {
    id: 2,
    name: "Classic Leather Jacket",
    brand: "Biker Premium",
    price: 699,
    salePrice: 549,
    image: "https://readdy.ai/api/search-image?query=Premium%20black%20leather%20jacket%20on%20white%20background%2C%20motorcycle%20jacket%20photography%2C%20classic%20biker%20style%2C%20professional%20product%20styling&width=400&height=400&seq=leather-jacket-1&orientation=squarish",
    category: "outerwear",
    features: ["Genuine Leather", "Zip Closure", "Multiple Pockets"]
  },
  {
    id: 3,
    name: "Heritage Trench Coat",
    brand: "Classic London",
    price: 599,
    salePrice: 479,
    image: "https://readdy.ai/api/search-image?query=Elegant%20beige%20trench%20coat%20on%20white%20background%2C%20classic%20raincoat%20photography%2C%20sophisticated%20outerwear%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=trench-coat-1&orientation=squarish",
    category: "outerwear",
    features: ["Water Proof", "Belted Waist", "Classic Cut"]
  },
  {
    id: 4,
    name: "Wool Tailored Blazer",
    brand: "Professional Line",
    price: 449,
    salePrice: 359,
    image: "https://readdy.ai/api/search-image?query=Premium%20wool%20blazer%20on%20white%20background%2C%20structured%20business%20jacket%20photography%2C%20professional%20styling%2C%20elegant%20product%20shot&width=400&height=400&seq=wool-blazer-1&orientation=squarish",
    category: "outerwear",
    features: ["Pure Wool", "Structured Cut", "Professional Fit"]
  },

  // Evening Category
  {
    id: 5,
    name: "Midnight Gala Dress",
    brand: "Evening Luxe",
    price: 899,
    salePrice: 699,
    image: "https://readdy.ai/api/search-image?query=Elegant%20black%20evening%20gown%20on%20white%20background%2C%20formal%20dress%20photography%2C%20sophisticated%20evening%20wear%20styling%2C%20luxury%20fashion%20product%20shot&width=400&height=400&seq=evening-dress-1&orientation=squarish",
    category: "evening",
    features: ["Silk Fabric", "Floor Length", "Back Zipper"]
  },
  {
    id: 6,
    name: "Cocktail Party Dress",
    brand: "Party Elite",
    price: 599,
    salePrice: 479,
    image: "https://readdy.ai/api/search-image?query=Sophisticated%20cocktail%20dress%20on%20white%20background%2C%20party%20wear%20photography%2C%20elegant%20short%20dress%20styling%2C%20professional%20fashion%20product%20shot&width=400&height=400&seq=cocktail-dress-1&orientation=squarish",
    category: "evening",
    features: ["Sequin Details", "Midi Length", "Party Ready"]
  },
  {
    id: 7,
    name: "Red Carpet Gown",
    brand: "Glamour Collection",
    price: 1299,
    salePrice: 999,
    image: "https://readdy.ai/api/search-image?query=Luxury%20red%20carpet%20gown%20on%20white%20background%2C%20formal%20evening%20dress%20photography%2C%20glamorous%20styling%2C%20high-end%20fashion%20product%20shot&width=400&height=400&seq=red-carpet-gown-1&orientation=squarish",
    category: "evening",
    features: ["Designer Cut", "Premium Fabric", "Statement Style"]
  },

  // Accessories Category
  {
    id: 8,
    name: "Executive Leather Belt",
    brand: "Business Elite",
    price: 299,
    salePrice: 239,
    image: "https://readdy.ai/api/search-image?query=Premium%20leather%20belt%20on%20white%20background%2C%20luxury%20belt%20photography%2C%20executive%20accessory%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=leather-belt-1&orientation=squarish",
    category: "accessories",
    features: ["Italian Leather", "Gold Buckle", "Adjustable"]
  },
  {
    id: 9,
    name: "Silk Designer Scarf",
    brand: "Luxury Accessories",
    price: 199,
    salePrice: 159,
    image: "https://readdy.ai/api/search-image?query=Elegant%20silk%20scarf%20on%20white%20background%2C%20luxury%20fashion%20accessory%20photography%2C%20sophisticated%20pattern%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=silk-scarf-1&orientation=squarish",
    category: "accessories",
    features: ["100% Silk", "Hand Rolled", "Designer Print"]
  },
  {
    id: 10,
    name: "Premium Wallet",
    brand: "Leather Craft",
    price: 249,
    salePrice: 199,
    image: "https://readdy.ai/api/search-image?query=Luxury%20leather%20wallet%20on%20white%20background%2C%20premium%20wallet%20photography%2C%20elegant%20leather%20goods%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=premium-wallet-1&orientation=squarish",
    category: "accessories",
    features: ["Full Grain Leather", "RFID Blocking", "Multiple Cards"]
  },
  {
    id: 11,
    name: "Designer Sunglasses",
    brand: "Eyewear Luxe",
    price: 399,
    salePrice: 319,
    image: "https://readdy.ai/api/search-image?query=Designer%20sunglasses%20on%20white%20background%2C%20luxury%20eyewear%20photography%2C%20sophisticated%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=designer-sunglasses-1&orientation=squarish",
    category: "accessories",
    features: ["UV Protection", "Polarized", "Designer Frame"]
  },

  // Footwear Category
  {
    id: 12,
    name: "Designer High Heels",
    brand: "Luxury Steps",
    price: 599,
    salePrice: 479,
    image: "https://readdy.ai/api/search-image?query=Elegant%20high%20heel%20shoes%20on%20white%20background%2C%20designer%20footwear%20photography%2C%20sophisticated%20heel%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=high-heels-1&orientation=squarish",
    category: "footwear",
    features: ["Italian Leather", "4 Inch Heel", "Comfort Sole"]
  },
  {
    id: 13,
    name: "Luxury Sneakers",
    brand: "Street Elite",
    price: 449,
    salePrice: 359,
    image: "https://readdy.ai/api/search-image?query=Premium%20luxury%20sneakers%20on%20white%20background%2C%20designer%20footwear%20photography%2C%20sophisticated%20casual%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=luxury-sneakers-1&orientation=squarish",
    category: "footwear",
    features: ["Premium Materials", "Comfort Cushioning", "Designer Style"]
  },
  {
    id: 14,
    name: "Ankle Boots",
    brand: "Boot Collection",
    price: 549,
    salePrice: 439,
    image: "https://readdy.ai/api/search-image?query=Elegant%20ankle%20boots%20on%20white%20background%2C%20luxury%20boot%20photography%2C%20sophisticated%20footwear%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=ankle-boots-1&orientation=squarish",
    category: "footwear",
    features: ["Leather Upper", "Side Zip", "Block Heel"]
  },

  // Menswear Category
  {
    id: 15,
    name: "Executive Dress Shirt",
    brand: "Business Professional",
    price: 199,
    salePrice: 159,
    image: "https://readdy.ai/api/search-image?query=Premium%20white%20dress%20shirt%20on%20white%20background%2C%20formal%20menswear%20photography%2C%20professional%20shirt%20styling%2C%20elegant%20product%20shot&width=400&height=400&seq=dress-shirt-1&orientation=squarish",
    category: "menswear",
    features: ["Cotton Blend", "Non-Iron", "Tailored Fit"]
  },
  {
    id: 16,
    name: "Silk Luxury Tie",
    brand: "Tie Collection",
    price: 149,
    salePrice: 119,
    image: "https://readdy.ai/api/search-image?query=Luxury%20silk%20tie%20on%20white%20background%2C%20premium%20necktie%20photography%2C%20sophisticated%20menswear%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=silk-tie-1&orientation=squarish",
    category: "menswear",
    features: ["100% Silk", "Hand Made", "Classic Width"]
  },
  {
    id: 17,
    name: "Tailored Suit Jacket",
    brand: "Suit Masters",
    price: 899,
    salePrice: 719,
    image: "https://readdy.ai/api/search-image?query=Premium%20suit%20jacket%20on%20white%20background%2C%20tailored%20menswear%20photography%2C%20sophisticated%20business%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=suit-jacket-1&orientation=squarish",
    category: "menswear",
    features: ["Wool Blend", "Tailored Cut", "Two Button"]
  },

  // Knitwear Category
  {
    id: 18,
    name: "Cashmere Sweater",
    brand: "Knit Luxury",
    price: 399,
    salePrice: 319,
    image: "https://readdy.ai/api/search-image?query=Premium%20cashmere%20sweater%20on%20white%20background%2C%20luxury%20knitwear%20photography%2C%20sophisticated%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=cashmere-sweater-1&orientation=squarish",
    category: "knitwear",
    features: ["100% Cashmere", "Soft Touch", "Classic Fit"]
  },
  {
    id: 19,
    name: "Wool Cardigan",
    brand: "Comfort Elite",
    price: 299,
    salePrice: 239,
    image: "https://readdy.ai/api/search-image?query=Elegant%20wool%20cardigan%20on%20white%20background%2C%20premium%20knitwear%20photography%2C%20cozy%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=wool-cardigan-1&orientation=squarish",
    category: "knitwear",
    features: ["Merino Wool", "Button Front", "Relaxed Fit"]
  },

  // Denim Category
  {
    id: 20,
    name: "Vintage Denim Jacket",
    brand: "Denim Heritage",
    price: 249,
    salePrice: 199,
    image: "https://readdy.ai/api/search-image?query=Vintage%20denim%20jacket%20on%20white%20background%2C%20classic%20jean%20jacket%20photography%2C%20retro%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=denim-jacket-1&orientation=squarish",
    category: "denim",
    features: ["100% Cotton", "Vintage Wash", "Classic Cut"]
  },
  {
    id: 21,
    name: "Designer Jeans",
    brand: "Premium Denim",
    price: 349,
    salePrice: 279,
    image: "https://readdy.ai/api/search-image?query=Premium%20designer%20jeans%20on%20white%20background%2C%20luxury%20denim%20photography%2C%20sophisticated%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=designer-jeans-1&orientation=squarish",
    category: "denim",
    features: ["Stretch Denim", "Slim Fit", "Premium Wash"]
  },

  // Summer Category
  {
    id: 22,
    name: "Linen Summer Shirt",
    brand: "Resort Wear",
    price: 179,
    salePrice: 143,
    image: "https://readdy.ai/api/search-image?query=Light%20linen%20shirt%20on%20white%20background%2C%20summer%20clothing%20photography%2C%20breathable%20fabric%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=linen-shirt-1&orientation=squarish",
    category: "summer",
    features: ["100% Linen", "Breathable", "Relaxed Fit"]
  },
  {
    id: 23,
    name: "Beach Cover-Up",
    brand: "Vacation Style",
    price: 129,
    salePrice: 103,
    image: "https://readdy.ai/api/search-image?query=Elegant%20beach%20cover-up%20on%20white%20background%2C%20resort%20wear%20photography%2C%20vacation%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=beach-coverup-1&orientation=squarish",
    category: "summer",
    features: ["Lightweight", "Quick Dry", "Versatile Style"]
  },

  // Activewear Category
  {
    id: 24,
    name: "Athletic Performance Top",
    brand: "Sport Elite",
    price: 89,
    salePrice: 71,
    image: "https://readdy.ai/api/search-image?query=Premium%20athletic%20top%20on%20white%20background%2C%20sportswear%20photography%2C%20performance%20wear%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=athletic-top-1&orientation=squarish",
    category: "activewear",
    features: ["Moisture Wicking", "Stretch Fabric", "Athletic Fit"]
  },
  {
    id: 25,
    name: "Yoga Leggings",
    brand: "Mindful Movement",
    price: 119,
    salePrice: 95,
    image: "https://readdy.ai/api/search-image?query=Premium%20yoga%20leggings%20on%20white%20background%2C%20activewear%20photography%2C%20flexible%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=yoga-leggings-1&orientation=squarish",
    category: "activewear",
    features: ["High Waisted", "Four-Way Stretch", "Squat Proof"]
  },

  // Jewelry Category
  {
    id: 26,
    name: "Statement Necklace",
    brand: "Jewelry Elite",
    price: 299,
    salePrice: 239,
    image: "https://readdy.ai/api/search-image?query=Elegant%20statement%20necklace%20on%20white%20background%2C%20luxury%20jewelry%20photography%2C%20sophisticated%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=statement-necklace-1&orientation=squarish",
    category: "jewelry",
    features: ["Gold Plated", "Statement Design", "Adjustable Length"]
  },
  {
    id: 27,
    name: "Luxury Watch",
    brand: "Time Pieces",
    price: 1299,
    salePrice: 1039,
    image: "https://readdy.ai/api/search-image?query=Luxury%20watch%20on%20white%20background%2C%20premium%20timepiece%20photography%2C%20sophisticated%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=luxury-watch-1&orientation=squarish",
    category: "jewelry",
    features: ["Swiss Movement", "Leather Strap", "Water Resistant"]
  },

  // Basics Category
  {
    id: 28,
    name: "Classic White Tee",
    brand: "Essential Basics",
    price: 59,
    salePrice: 47,
    image: "https://readdy.ai/api/search-image?query=Classic%20white%20t-shirt%20on%20white%20background%2C%20basic%20clothing%20photography%2C%20minimal%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=white-tee-1&orientation=squarish",
    category: "basics",
    features: ["100% Cotton", "Pre-Shrunk", "Classic Fit"]
  },
  {
    id: 29,
    name: "Cotton Essentials Pack",
    brand: "Daily Comfort",
    price: 149,
    salePrice: 119,
    image: "https://readdy.ai/api/search-image?query=Cotton%20basic%20essentials%20on%20white%20background%2C%20everyday%20clothing%20photography%2C%20comfortable%20styling%2C%20professional%20product%20shot&width=400&height=400&seq=cotton-essentials-1&orientation=squarish",
    category: "basics",
    features: ["Soft Cotton", "Multi-Pack", "Everyday Comfort"]
  }
];

const categories = [
  'all', 'outerwear', 'evening', 'accessories', 'footwear', 
  'menswear', 'knitwear', 'denim', 'summer', 'activewear', 'jewelry', 'basics'
];

export default function CollectionsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    setAnimatingButtons(prev => new Set([...prev, `cart-${product.id}`]));
    
    cartStore.addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.salePrice,
      image: product.image,
      category: product.category
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
      category: product.category
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
          <h2 className="text-5xl font-black text-black mb-4">ALL COLLECTIONS</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of premium fashion items across all categories
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
              {category === 'all' ? 'all' : category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
