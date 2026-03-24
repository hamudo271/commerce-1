
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function WatchesHero() {
  const [scrollY, setScrollY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // 触发入场动画
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsDragging(true);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setDragY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartY(e.clientY);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && startY > 0) {
      const deltaY = e.clientY - startY;
      if (deltaY > 0) {
        setDragY(Math.min(deltaY * 0.3, 50)); // 限制拖拽距离
      }
    }
  };

  const handleMouseUp = () => {
    if (dragY > 30) {
      // 如果拖拽距离足够，触发滚动
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
    setDragY(0);
    setStartY(0);
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && startY > 0) {
      const deltaY = e.touches[0].clientY - startY;
      if (deltaY > 0) {
        setDragY(Math.min(deltaY * 0.3, 50));
      }
    }
  };

  const handleTouchEnd = () => {
    if (dragY > 30) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
    setDragY(0);
    setStartY(0);
    setIsDragging(false);
  };

  const handleClick = () => {
    if (dragY === 0) { // 只有在没有拖拽时才触发点击
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden mt-16 select-none">
      <div className="absolute inset-0">
        <Image
          src="https://readdy.ai/api/search-image?query=Luxury%20watch%20collection%20hero%20background%2C%20premium%20timepieces%20display%2C%20elegant%20black%20and%20white%20photography%20with%20dramatic%20lighting%2C%20sophisticated%20watch%20showcase%20on%20dark%20premium%20surface%2C%20high-end%20jewelry%20photography%20style%20with%20beautiful%20reflections%20and%20shadows&width=1920&height=1080&seq=watches-hero-bg&orientation=landscape"
          alt="Luxury Watches Collection"
          fill
          className={`object-cover object-center transition-all duration-2000 ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          } ${isDragging ? 'scale-105' : ''}`}
        />
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-1500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${isDragging ? 'bg-black/40' : ''}`} />
      </div>
      
      <div 
        className={`relative z-10 h-full flex items-center justify-center transition-transform duration-300 cursor-grab active:cursor-grabbing ${
          isDragging ? `transform translate-y-${Math.floor(dragY/10) + 4}` : ''
        }`}
        style={{
          transform: `translateY(${dragY}px)`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <div className="space-y-8">
            <h1 className={`text-6xl md:text-8xl font-black tracking-wider transition-all duration-1000 delay-300 ${
              isDragging ? 'transform scale-105' : ''
            } ${
              isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'
            }`}>
              LUXURY
            </h1>
            <h2 className={`text-6xl md:text-8xl font-black text-amber-400 transition-all duration-1000 delay-500 ${
              isDragging ? 'transform scale-105' : ''
            } ${
              isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'
            }`}>
              TIMEPIECES
            </h2>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${
              isDragging ? 'transform translate-y-2' : ''
            } ${
              isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'
            }`}>
              Discover our exclusive collection of premium Swiss watches, where traditional craftsmanship meets contemporary design. Each timepiece tells a story of precision, elegance, and timeless luxury.
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center transition-all duration-1000 delay-900 ${
              isDragging ? 'transform translate-y-4' : ''
            } ${
              isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'
            }`}>
              <div className={`transition-all duration-800 delay-1000 ${
                isLoaded ? 'transform scale-100 opacity-100' : 'transform scale-75 opacity-0'
              }`}>
                <div className="text-3xl font-black text-amber-400 mb-2">150+</div>
                <div className="text-sm uppercase tracking-wider">Exclusive Models</div>
              </div>
              <div className={`transition-all duration-800 delay-1200 ${
                isLoaded ? 'transform scale-100 opacity-100' : 'transform scale-75 opacity-0'
              }`}>
                <div className="text-3xl font-black text-amber-400 mb-2">Swiss</div>
                <div className="text-sm uppercase tracking-wider">Premium Craftsmanship</div>
              </div>
              <div className={`transition-all duration-800 delay-1400 ${
                isLoaded ? 'transform scale-100 opacity-100' : 'transform scale-75 opacity-0'
              }`}>
                <div className="text-3xl font-black text-amber-400 mb-2">24/7</div>
                <div className="text-sm uppercase tracking-wider">Concierge Service</div>
              </div>
            </div>

            {/* 拖拽提示文字 */}
            {isDragging && (
              <div className={`mt-8 text-amber-400 text-sm uppercase tracking-wider animate-pulse transition-all duration-300 ${
                dragY > 20 ? 'text-green-400' : ''
              }`}>
                {dragY > 20 ? 'Release to Continue' : 'Drag Down to Explore'}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating Price Badge with entrance animation */}
      <div className={`absolute top-32 right-10 bg-amber-400 text-black px-6 py-3 font-black text-lg shadow-2xl transition-all duration-1000 delay-800 ${
        isDragging ? 'transform translate-y-2 scale-105' : ''
      } ${
        isLoaded ? 'transform translate-x-0 opacity-100 rotate-0' : 'transform translate-x-20 opacity-0 rotate-12'
      }`}>
        From $2,999
      </div>
      
      {/* Decorative floating elements */}
      <div className={`absolute top-1/4 left-10 w-3 h-3 bg-amber-400 rounded-full transition-all duration-2000 delay-1000 ${
        isLoaded ? 'opacity-60 animate-pulse' : 'opacity-0'
      } ${isDragging ? 'animate-ping' : ''}`}></div>
      <div className={`absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full transition-all duration-2000 delay-1200 ${
        isLoaded ? 'opacity-40 animate-pulse' : 'opacity-0'
      } ${isDragging ? 'animate-ping' : ''}`}></div>
      <div className={`absolute bottom-1/3 left-1/4 w-4 h-4 border border-amber-400 transition-all duration-2000 delay-1400 ${
        isLoaded ? 'opacity-30 animate-spin' : 'opacity-0'
      } ${isDragging ? 'animate-bounce' : ''}`} style={{animationDuration: isDragging ? '0.5s' : '8s'}}></div>

      {/* Enhanced Drag Effect */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
        isDragging ? 'bg-gradient-to-b from-transparent via-transparent to-amber-400/20' : ''
      }`}>
        {isDragging && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-400/20 to-transparent animate-pulse" 
               style={{ height: `${Math.max(dragY * 2, 50)}px` }} />
        )}
      </div>
    </section>
  );
}
