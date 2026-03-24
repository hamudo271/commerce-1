
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slides = [
    {
      id: 1,
      title: "BLACK FRIDAY",
      subtitle: "MEGA SALE",
      description: "Up to 80% OFF on premium fashion collections",
      cta: "Shop Now",
      bgImage: "https://readdy.ai/api/search-image?query=Bright%20elegant%20fashion%20photography%20with%20model%20in%20stylish%20outfit%2C%20well-lit%20professional%20studio%20setting%2C%20clean%20bright%20background%20with%20soft%20natural%20lighting%2C%20contemporary%20fashion%20styling%20with%20sophisticated%20atmosphere%2C%20brighter%20tones%20similar%20to%20luxury%20editorial%20photography&width=1920&height=1080&seq=hero-bg1-bright&orientation=landscape"
    },
    {
      id: 2,
      title: "LUXURY",
      subtitle: "REDEFINED",
      description: "Designer pieces at unbeatable Black Friday prices",
      cta: "Explore",
      bgImage: "https://readdy.ai/api/search-image?query=High-end%20fashion%20editorial%20photography%20with%20elegant%20model%20in%20luxury%20attire%2C%20sophisticated%20dark%20atmosphere%2C%20professional%20studio%20lighting%2C%20premium%20fashion%20styling&width=1920&height=1080&seq=hero-bg2&orientation=landscape"
    },
    {
      id: 3,
      title: "WINTER",
      subtitle: "COLLECTION",
      description: "Exclusive pieces for the cold season ahead",
      cta: "Discover",
      bgImage: "https://readdy.ai/api/search-image?query=Fashion%20model%20in%20winter%20coat%20photography%2C%20dark%20moody%20atmosphere%2C%20urban%20setting%20with%20dramatic%20shadows%2C%20contemporary%20fashion%20styling%20with%20artistic%20composition&width=1920&height=1080&seq=hero-bg3&orientation=landscape"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const scrollToCollections = () => {
    const collectionsElement = document.getElementById('collections');
    if (collectionsElement) {
      collectionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeaturedCollections = () => {
    const featuredCollectionsElement = document.querySelector('[data-product-shop]');
    if (featuredCollectionsElement) {
      featuredCollectionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const progress = Math.min(scrollY / 400, 1);
  const isCountdownTransformed = progress > 0.2;

  return (
    <div 
      className={`relative h-screen overflow-hidden bg-black transition-all duration-700 ${ 
        isCountdownTransformed ? 'mt-28' : 'mt-16'
      }`}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${ 
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.bgImage}
            alt={slide.title}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-7xl md:text-8xl font-black text-white mb-6 animate-fade-in-up">
            BLACK FRIDAY SALE
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 animate-fade-in-up animation-delay-300 font-light">
            Up to 80% OFF on Premium Fashion
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-600 leading-relaxed">
            Exclusive deals on luxury brands. Premium quality at unprecedented prices. Limited time offer.
          </p>
          <button 
            onClick={scrollToFeaturedCollections}
            className="bg-white text-black px-12 py-4 text-xl font-bold hover:bg-red-600 hover:text-white transition-all duration-500 transform hover:scale-105 shadow-2xl whitespace-nowrap cursor-pointer animate-fade-in-up animation-delay-900"
          >
            Discover
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${ 
              index === currentSlide 
                ? 'bg-red-600 scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}