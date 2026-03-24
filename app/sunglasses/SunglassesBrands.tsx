
'use client';

import { useEffect, useRef, useState } from 'react';

const brandLogos = [
  {
    name: "Ray-Ban",
    description: "Iconic American eyewear brand that defines modern sunglasses classic style",
    heritage: "80+ Years",
    specialty: "Aviator & Wayfarer",
    foundedYear: "1937"
  },
  {
    name: "Oakley",
    description: "Performance-driven eyewear brand specializing in sports and active lifestyle sunglasses",
    heritage: "50+ Years", 
    specialty: "Performance Sports",
    foundedYear: "1975"
  },
  {
    name: "Gucci",
    description: "Italian luxury fashion brand perfectly blending traditional craftsmanship with modern design",
    heritage: "105+ Years",
    specialty: "Luxury Fashion",
    foundedYear: "1921"
  },
  {
    name: "Tom Ford",
    description: "Contemporary luxury designer brand renowned for exquisite craftsmanship and unique style",
    heritage: "20+ Years",
    specialty: "Contemporary Luxury",
    foundedYear: "2005"
  },
  {
    name: "Oliver Peoples",
    description: "American boutique eyewear brand famous for vintage-inspired designs and superior craftsmanship",
    heritage: "35+ Years",
    specialty: "Vintage-Inspired",
    foundedYear: "1987"
  },
  {
    name: "Persol",
    description: "Italian handcrafted eyewear brand preserving century-old Italian artisan traditions",
    heritage: "110+ Years",
    specialty: "Italian Artisan",
    foundedYear: "1917"
  }
];

export default function SunglassesBrands() {
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
          <h2 className="text-5xl font-black text-black mb-4">PREMIUM BRANDS</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the world's most revered sunglasses brands, where each piece embodies a legacy of craftsmanship and a commitment to stylistic innovation.
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
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-sun-line text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Ray-Ban</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Iconic American brand known for timeless aviator and wayfarer designs that define classic eyewear style
            </p>
          </div>
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
              EYEWEAR EXCELLENCE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group cursor-pointer">
                <div className="text-4xl font-black text-black mb-2 group-hover:scale-110 transition-transform duration-300">110+</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Years of Heritage</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-4xl font-black text-black mb-2 group-hover:scale-110 transition-transform duration-300">Premium</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Lens Technology</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-4xl font-black text-black mb-2 group-hover:scale-110 transition-transform duration-300">Iconic</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">Frame Designs</div>
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
