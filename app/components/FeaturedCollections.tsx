
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const collectionsData = [
  {
    id: 1,
    name: "Premium Handbags",
    description: "Luxury leather craftsmanship meets contemporary design in our exclusive handbag collection",
    image: "https://readdy.ai/api/search-image?query=Luxury%20handbag%20collection%2C%20premium%20leather%20goods%20photography%2C%20elegant%20black%20and%20white%20styling%2C%20sophisticated%20fashion%20accessories%20showcase&width=600&height=800&seq=handbags-featured&orientation=portrait",
    link: "/handbags",
    hasButton: true
  },
  {
    id: 2,
    name: "Designer Watches",
    description: "Precision timepieces that blend traditional craftsmanship with modern sophistication",
    image: "https://readdy.ai/api/search-image?query=Designer%20watch%20collection%20photography%2C%20luxury%20timepieces%20display%2C%20elegant%20black%20and%20white%20styling%2C%20premium%20accessories%20showcase%20with%20sophisticated%20lighting&width=600&height=800&seq=watches-featured&orientation=portrait",
    link: "/watches",
    hasButton: true
  },
  {
    id: 3,
    name: "Luxury Sunglasses",
    description: "Luxury sunglasses and optical frames",
    image: "https://readdy.ai/api/search-image?query=Premium%20luxury%20sunglasses%20collection%2C%20elegant%20eyewear%20photography%2C%20sophisticated%20black%20and%20white%20styling%2C%20high-end%20fashion%20accessories%20display&width=600&height=800&seq=sunglasses-featured&orientation=portrait",
    link: "/sunglasses",
    hasButton: true
  }
];

export default function FeaturedCollections() {
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
            }, index * 200);
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
    <section id="collections" className="py-20 bg-gray-50" data-featured-collections>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">SIGNATURE COLLECTIONS</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore our carefully curated collections of premium fashion accessories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collectionsData.map((collection, index) => (
            <div
              key={collection.id}
              ref={el => refs.current[index] = el}
              className={`group relative overflow-hidden aspect-[3/4] cursor-pointer transform transition-all duration-700 hover:scale-110 hover:z-20 ${
                visibleItems.has(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <Link href={collection.link} className="block w-full h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />
                  
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                    <div className="space-y-4 transform transition-all duration-500 group-hover:scale-105">
                      <h3 className="text-white text-2xl md:text-3xl font-black">
                        {collection.name}
                      </h3>
                      
                      {collection.hasButton && (
                        <>
                          <p className="text-white/80 text-sm">
                            {collection.description}
                          </p>
                          
                          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 font-bold border border-white/30 hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap cursor-pointer">
                            DISCOVER
                          </button>
                        </>
                      )}
                      
                      {!collection.hasButton && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-white/80 text-sm">
                            {collection.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 transition-all duration-500" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
