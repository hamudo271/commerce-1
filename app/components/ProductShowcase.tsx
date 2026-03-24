
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const featuredCollections = [
  {
    id: 1,
    name: "WINTER COATS",
    subtitle: "Premium Outerwear",
    description: "Luxury leather jackets and premium winter coats for the modern wardrobe",
    itemCount: "35+ Items",
    image: "https://readdy.ai/api/search-image?query=Luxury%20winter%20coat%20and%20premium%20outerwear%20collection%20display%2C%20elegant%20black%20and%20white%20photography%2C%20sophisticated%20fashion%20styling%20with%20dramatic%20lighting%2C%20high-end%20winter%20fashion%20showcase%20on%20clean%20background&width=500&height=500&seq=coat-collection-updated&orientation=squarish",
    span: "col-span-1",
    aspect: "aspect-square",
    slug: "winter-coats"
  },
  {
    id: 2,
    name: "EVENING LUXURY",
    subtitle: "Sophisticated Elegance",
    description: "Curated collection of premium evening wear and luxury accessories that define sophistication",
    itemCount: "45+ Items",
    image: "https://readdy.ai/api/search-image?query=Premium%20evening%20wear%20and%20luxury%20fashion%20collection%2C%20elegant%20black%20and%20white%20photography%2C%20sophisticated%20evening%20gowns%20and%20formal%20accessories%20display%2C%20high-end%20fashion%20styling%20with%20dramatic%20contrast&width=800&height=400&seq=evening-hero-updated&orientation=landscape",
    span: "col-span-2",
    aspect: "aspect-[2/1]",
    slug: "evening-luxury"
  },
  {
    id: 3,
    name: "PREMIUM KNITS",
    subtitle: "Cashmere Excellence",
    description: "Hand-selected cashmere and luxury knitwear pieces",
    itemCount: "28+ Items",
    image: "https://readdy.ai/api/search-image?query=Premium%20cashmere%20sweater%20and%20luxury%20knitwear%20collection%2C%20soft%20textures%20and%20elegant%20styling%2C%20black%20and%20white%20fashion%20photography%2C%20sophisticated%20knit%20garments%20display%20with%20professional%20lighting&width=500&height=500&seq=knits-collection-updated&orientation=squarish",
    span: "col-span-1",
    aspect: "aspect-square",
    slug: "premium-knits"
  },
  {
    id: 4,
    name: "DESIGNER BAGS",
    subtitle: "Statement Accessories",
    description: "Iconic handbags and luxury accessories collection",
    itemCount: "60+ Items",
    image: "https://readdy.ai/api/search-image?query=Designer%20handbag%20and%20luxury%20leather%20accessories%20collection%2C%20premium%20bag%20display%2C%20black%20and%20white%20photography%2C%20sophisticated%20accessory%20styling%20with%20elegant%20composition%20and%20professional%20lighting&width=500&height=500&seq=bags-collection-updated&orientation=squarish",
    span: "col-span-1",
    aspect: "aspect-square",
    slug: "designer-bags"
  },
  {
    id: 5,
    name: "LUXURY FOOTWEAR",
    subtitle: "Premium Styles",
    description: "Designer sneakers and luxury shoe collection",
    itemCount: "40+ Items",
    image: "https://readdy.ai/api/search-image?query=Luxury%20footwear%20and%20designer%20shoe%20collection%20display%2C%20premium%20sneakers%20and%20elegant%20shoes%2C%20black%20and%20white%20photography%2C%20sophisticated%20shoe%20styling%20with%20professional%20composition&width=500&height=500&seq=shoes-collection-updated&orientation=squarish",
    span: "col-span-1",
    aspect: "aspect-square",
    slug: "luxury-footwear"
  },
  {
    id: 6,
    name: "TAILORED SUITS",
    subtitle: "Executive Collection",
    description: "Premium blazers and tailored menswear pieces",
    itemCount: "32+ Items",
    image: "https://readdy.ai/api/search-image?query=Tailored%20suit%20and%20premium%20blazer%20collection%2C%20elegant%20menswear%20display%2C%20black%20and%20white%20photography%2C%20sophisticated%20business%20attire%20styling%20with%20professional%20composition%20and%20dramatic%20lighting&width=500&height=500&seq=suits-collection-updated&orientation=squarish",
    span: "col-span-1",
    aspect: "aspect-square",
    slug: "tailored-suits"
  },
  {
    id: 7,
    name: "VINTAGE DENIM",
    subtitle: "Timeless Classics",
    description: "Premium vintage denim and contemporary streetwear essentials",
    itemCount: "52+ Items",
    image: "https://readdy.ai/api/search-image?query=Vintage%20denim%20jacket%20and%20premium%20jeans%20collection%2C%20classic%20denim%20styling%2C%20black%20and%20white%20photography%2C%20sophisticated%20streetwear%20display%20with%20elegant%20composition%20and%20professional%20lighting&width=500&height=500&seq=denim-collection-updated&orientation=squarish",
    span: "col-span-1",
    aspect: "aspect-square",
    slug: "vintage-denim"
  },
  {
    id: 8,
    name: "SILK SCARVES",
    subtitle: "Luxury Accessories",
    description: "Handcrafted silk scarves and premium fashion accessories",
    itemCount: "25+ Items",
    image: "https://readdy.ai/api/search-image?query=Premium%20silk%20scarf%20and%20luxury%20fashion%20accessory%20collection%2C%20elegant%20scarf%20display%20with%20beautiful%20patterns%2C%20black%20and%20white%20photography%2C%20sophisticated%20styling%20with%20professional%20composition&width=500&height=500&seq=silk-scarf-updated&orientation=squarish",
    span: "col-span-1",
    aspect: "aspect-square",
    slug: "silk-scarves"
  }
];

export default function ProductShowcase() {
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
            }, index * 150);
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
    <section className="py-20 bg-white" data-product-shop>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">FEATURED COLLECTIONS</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dare to mix and match! Check our collections to level up your fashion game
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCollections.map((collection, index) => (
            <Link key={collection.id} href="/collections">
              <div
                ref={el => refs.current[index] = el}
                className={`group relative overflow-hidden aspect-square transform transition-all duration-700 cursor-pointer ${
                  visibleItems.has(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />
                  
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                    <div className="space-y-4 transform transition-all duration-500 group-hover:scale-105">
                      <div className="space-y-2">
                        <h3 className="text-white text-xl lg:text-2xl font-black">
                          {collection.name}
                        </h3>
                        
                        <p className="text-white/90 text-xs font-medium tracking-wider uppercase">
                          {collection.subtitle}
                        </p>
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 space-y-3">
                        <p className="text-white/80 text-xs leading-relaxed max-w-xs mx-auto">
                          {collection.description}
                        </p>
                        <div className="text-white/70 text-xs font-bold tracking-wider">
                          {collection.itemCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-black text-black">8</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Collections</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-black text-black">316+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Premium Items</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-black text-black">70%</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Max Discount</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-black text-black">24H</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Fast Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
}
