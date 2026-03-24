
'use client';

import { useState, useEffect, useRef } from 'react';

const brandLogos = [
  {
    name: "Rolex",
    description: "Swiss luxury watch manufacturer renowned for precision and prestige",
    heritage: "120+ Years",
    specialty: "Crown Collection",
    foundedYear: "1905"
  },
  {
    name: "Patek Philippe",
    description: "Independent Swiss watch manufacturer known for complicated timepieces",
    heritage: "185+ Years", 
    specialty: "Grand Complications",
    foundedYear: "1839"
  },
  {
    name: "Audemars Piguet",
    description: "Swiss manufacturer of luxury mechanical watches and clocks",
    heritage: "150+ Years",
    specialty: "Royal Oak Collection",
    foundedYear: "1875"
  },
  {
    name: "Omega",
    description: "Swiss luxury watchmaker known for precision and innovation",
    heritage: "175+ Years",
    specialty: "Speedmaster & Seamaster",
    foundedYear: "1848"
  },
  {
    name: "Tag Heuer",
    description: "Swiss luxury watchmaker known for sports watches and chronographs",
    heritage: "165+ Years",
    specialty: "Racing Chronographs",
    foundedYear: "1860"
  },
  {
    name: "Breitling",
    description: "Swiss luxury watchmaker specializing in aviation watches",
    heritage: "140+ Years",
    specialty: "Aviation Instruments",
    foundedYear: "1884"
  }
];

export default function WatchesBrands() {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-scroll through brands
  useEffect(() => {
    if (isAutoScrolling) {
      intervalRef.current = setInterval(() => {
        setSelectedBrand(prev => (prev + 1) % brandLogos.length);
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoScrolling]);

  // Handle manual brand selection
  const handleBrandClick = (index) => {
    setSelectedBrand(index);
    setIsAutoScrolling(false);
    
    // Resume auto-scroll after 5 seconds
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  // Horizontal scroll animation for brand names
  const duplicatedBrands = [...brandLogos, ...brandLogos];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">PRESTIGIOUS BRANDS</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover timepieces from the world's most renowned Swiss watch manufacturers, each representing decades of horological excellence and innovation
          </p>
        </div>

        {/* Horizontal Scrolling Brand Names */}
        <div className="relative mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50 z-10 pointer-events-none"></div>
          
          <div 
            ref={scrollContainerRef}
            className="flex whitespace-nowrap animate-scroll-horizontal"
            style={{
              animation: 'scroll-horizontal 30s linear infinite'
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                onClick={() => handleBrandClick(index % brandLogos.length)}
                className="inline-flex items-center mx-8 cursor-pointer group transform hover:scale-110 transition-all duration-300"
              >
                <span className="text-6xl font-black text-transparent bg-gradient-to-r from-gray-800 to-black bg-clip-text group-hover:from-black group-hover:to-gray-600 transition-all duration-500">
                  {brand.name}
                </span>
                <div className="ml-6 text-gray-600 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-2xl font-light">EST. {brand.foundedYear}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Brand Details */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div className="transform transition-all duration-700">
              <h3 className="text-4xl font-black text-black mb-4">
                {brandLogos[selectedBrand].name}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {brandLogos[selectedBrand].description}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-black mb-1">
                    {brandLogos[selectedBrand].heritage}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Heritage</div>
                </div>
                <div className="p-4 bg-white border border-gray-200 shadow-sm">
                  <div className="text-lg font-bold text-gray-800 mb-1">
                    {brandLogos[selectedBrand].specialty}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Specialty</div>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Navigation Dots */}
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center">
              <div className="text-8xl font-black text-transparent bg-gradient-to-b from-gray-800 to-black bg-clip-text mb-4">
                {brandLogos[selectedBrand].foundedYear}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">Founded</div>
            </div>
            
            <div className="flex space-x-3">
              {brandLogos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleBrandClick(index)}
                  className={`w-4 h-4 border-2 transition-all duration-300 cursor-pointer ${
                    index === selectedBrand
                      ? 'bg-black border-black scale-125'
                      : 'border-gray-400 hover:border-black hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Brand Heritage Stats */}
        <div className="bg-white border border-gray-200 shadow-sm py-16 px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-black mb-8 text-transparent bg-gradient-to-r from-gray-800 to-black bg-clip-text">
              HOROLOGICAL EXCELLENCE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group cursor-pointer">
                <div className="text-4xl font-black text-black mb-2 group-hover:scale-110 transition-transform duration-300">270+</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Years of Heritage</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-4xl font-black text-black mb-2 group-hover:scale-110 transition-transform duration-300">Swiss</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Certified Quality</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-4xl font-black text-black mb-2 group-hover:scale-110 transition-transform duration-300">Exclusive</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Limited Editions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Our Collection */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Our Collection?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <i className="ri-shield-check-line text-white w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h4 className="font-bold text-gray-900">Authenticity Guaranteed</h4>
              <p className="text-gray-600 text-sm">Every piece is verified authentic</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <i className="ri-truck-line text-white w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h4 className="font-bold text-gray-900">Free Shipping</h4>
              <p className="text-gray-600 text-sm">Complimentary shipping worldwide</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <i className="ri-refresh-line text-white w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h4 className="font-bold text-gray-900">Easy Returns</h4>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <i className="ri-customer-service-2-line text-white w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h4 className="font-bold text-gray-900">Expert Support</h4>
              <p className="text-gray-600 text-sm">24/7 luxury concierge service</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite;
        }
        
        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
