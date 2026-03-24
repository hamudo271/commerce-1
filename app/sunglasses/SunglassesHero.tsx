
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SunglassesHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Stylish%20person%20wearing%20luxury%20sunglasses%20in%20urban%20setting%2C%20dramatic%20black%20and%20white%20fashion%20photography%2C%20sophisticated%20eyewear%20styling%20with%20city%20backdrop%2C%20modern%20editorial%20composition%20perfect%20for%20sunglasses%20brand%20hero%20section&width=1920&height=1080&seq=sunglasses-hero-updated&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex items-center justify-center h-full">
          <div className={`text-white text-center space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className={`space-y-4 transform transition-all duration-1200 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                LUXURY
                <span className="block text-yellow-400">SUNGLASSES</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto">
                Premium eyewear collection featuring designer frames and superior UV protection
              </p>
            </div>
            
            <div className={`space-y-4 transform transition-all duration-1400 delay-600 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="flex items-center justify-center space-x-8 md:space-x-12">
                <div className="text-center hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-bold">100+</div>
                  <div className="text-sm text-white/80">Styles Available</div>
                </div>
                <div className="text-center hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-bold">UV400</div>
                  <div className="text-sm text-white/80">Protection</div>
                </div>
                <div className="text-center hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-bold">15+</div>
                  <div className="text-sm text-white/80">Premium Brands</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
