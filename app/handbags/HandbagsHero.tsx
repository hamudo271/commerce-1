
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HandbagsHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const heroSlides = [
    {
      title: "LUXURY HANDBAGS",
      subtitle: "TIMELESS ELEGANCE",
      description: "Discover our exclusive collection of premium leather handbags crafted with precision and passion",
      image: "https://readdy.ai/api/search-image?query=Luxury%20handbag%20hero%20section%20with%20elegant%20model%20holding%20premium%20leather%20bag%2C%20sophisticated%20black%20and%20white%20fashion%20photography%2C%20minimalist%20background%20with%20dramatic%20lighting%2C%20high-end%20fashion%20editorial%20style&width=1920&height=1080&seq=handbags-hero1&orientation=landscape"
    },
    {
      title: "ARTISAN CRAFTED",
      subtitle: "ITALIAN LEATHER",
      description: "Each piece is meticulously handcrafted by skilled artisans using the finest Italian leather",
      image: "https://readdy.ai/api/search-image?query=Elegant%20luxury%20handbag%20collection%20showcase%20with%20multiple%20premium%20leather%20bags%2C%20sophisticated%20studio%20photography%2C%20clean%20minimalist%20background%20with%20professional%20lighting%2C%20high-end%20fashion%20accessories%20display&width=1920&height=1080&seq=handbags-hero-new2&orientation=landscape"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden mt-16 bg-black">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-wider mb-4">
            LUXURY
            <span className="block text-yellow-400">HANDBAGS</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-light text-gray-300 mb-6">
            {heroSlides[currentSlide].subtitle}
          </h2>
          <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto">
            {heroSlides[currentSlide].description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
