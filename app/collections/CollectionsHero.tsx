
'use client';

import Image from 'next/image';

export default function CollectionsHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <Image
        src="https://readdy.ai/api/search-image?query=Luxury%20fashion%20collection%20hero%20background%2C%20elegant%20black%20and%20white%20photography%2C%20sophisticated%20fashion%20styling%20with%20dramatic%20lighting%2C%20premium%20clothing%20and%20accessories%20display%20in%20minimalist%20setting&width=1920&height=800&seq=collections-hero-bg&orientation=landscape"
        alt="Collections Hero"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-black mb-6">
          PREMIUM COLLECTIONS
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
          Explore our carefully curated luxury fashion collections, each representing exceptional quality and design
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 text-white font-bold border border-white/30">
            12+ Curated Collections
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 text-white font-bold border border-white/30">
            400+ Premium Items
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 text-white font-bold border border-white/30">
            Up to 70% Off
          </div>
        </div>
      </div>
    </section>
  );
}
