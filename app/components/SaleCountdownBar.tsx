
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SaleCountdownBar() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 45
  });
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          return { hours: 23, minutes: 59, seconds: 59 };
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMounted]);

  const scrollToCollections = () => {
    const collectionsElement = document.getElementById('collections');
    if (collectionsElement) {
      collectionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isMounted) {
    return null;
  }

  const progress = Math.min(scrollY / 400, 1);
  const isTransformed = progress > 0.2;

  return (
    <>
      {/* 全屏倒计时模式 */}
      {!isTransformed && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-700 ease-out"
          style={{
            transform: `scale(${1 - progress * 0.3})`,
          }}
        >
          {/* 背景图片 */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Luxury%20Black%20Friday%20sale%20background%2C%20premium%20shopping%20atmosphere%20with%20golden%20accents%2C%20sophisticated%20dark%20elegant%20styling%2C%20high-end%20retail%20environment%20with%20dramatic%20lighting%20and%20luxurious%20textures&width=1920&height=1080&seq=blackfriday-hero&orientation=landscape')`,
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          
          {/* 向下滚动提示 */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex flex-col items-center text-white/80 animate-fade-in-up animation-delay-1500">
              <span className="text-sm font-medium mb-2">Scroll down to explore more</span>
              <div className="animate-bounce">
                <i className="ri-arrow-down-s-line w-8 h-8 flex items-center justify-center text-3xl"></i>
              </div>
            </div>
          </div>
          
          <div className="relative text-center space-y-8 px-4">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-wider">
                BLACK FRIDAY
              </h1>
              <p className="text-2xl md:text-3xl text-red-500 font-bold">
                EXCLUSIVE SALE ENDS IN
              </p>
            </div>
            
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="bg-red-600 rounded-lg p-4 md:p-6 min-w-[100px]">
                  <div className="text-4xl md:text-6xl font-black text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                </div>
                <div className="text-white/80 text-lg font-bold mt-2">HOURS</div>
              </div>
              
              <div className="text-center">
                <div className="bg-red-600 rounded-lg p-4 md:p-6 min-w-[100px]">
                  <div className="text-4xl md:text-6xl font-black text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                </div>
                <div className="text-white/80 text-lg font-bold mt-2">MINUTES</div>
              </div>
              
              <div className="text-center">
                <div className="bg-red-600 rounded-lg p-4 md:p-6 min-w-[100px]">
                  <div className="text-4xl md:text-6xl font-black text-white">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
                <div className="text-white/80 text-lg font-bold mt-2">SECONDS</div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-white/90">Save up to 70% on premium fashion</p>
            </div>
          </div>
        </div>
      )}

      {/* 顶部导航栏倒计时模式 */}
      {isTransformed && (
        <div className="fixed top-16 left-0 right-0 z-40 h-12 bg-red-600 flex items-center justify-center transition-all duration-700">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 w-full">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-sm text-white">BLACK FRIDAY SALE ENDS IN:</span>
              <div className="flex items-center space-x-2">
                <div className="bg-black/20 px-2 py-1 rounded text-xs font-bold text-white">
                  {String(timeLeft.hours).padStart(2, '0')}H
                </div>
                <div className="bg-black/20 px-2 py-1 rounded text-xs font-bold text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}M
                </div>
                <div className="bg-black/20 px-2 py-1 rounded text-xs font-bold text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}S
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-white">Save up to 70%</span>
              <button 
                onClick={scrollToCollections}
                className="bg-white text-red-600 px-4 py-1 text-xs font-bold hover:bg-black hover:text-white transition-colors duration-300 whitespace-nowrap cursor-pointer"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
