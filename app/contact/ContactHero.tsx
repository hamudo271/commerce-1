
'use client';

import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://readdy.ai/api/search-image?query=Professional%20customer%20service%20and%20luxury%20retail%20contact%20hero%20image%2C%20elegant%20modern%20office%20space%20with%20sophisticated%20lighting%2C%20premium%20fashion%20brand%20headquarters%20atmosphere%2C%20clean%20minimalist%20design%20with%20warm%20welcoming%20ambiance&width=1920&height=800&seq=contact-hero-bg&orientation=landscape"
          alt="Contact Hero Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-6xl font-black mb-6">GET IN TOUCH</h1>
        <p className="text-2xl font-light mb-8 max-w-2xl mx-auto">
          We're here to help you with any questions about our luxury fashion collections
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-lg">
          <div className="flex items-center space-x-2">
            <i className="ri-time-line w-6 h-6 flex items-center justify-center"></i>
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="ri-phone-line w-6 h-6 flex items-center justify-center"></i>
            <span>Instant Response</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="ri-global-line w-6 h-6 flex items-center justify-center"></i>
            <span>Worldwide Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
