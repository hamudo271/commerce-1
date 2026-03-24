
'use client';

import Image from 'next/image';

const features = [
  {
    icon: "ri-shield-check-line",
    title: "UV400 Protection",
    description: "Complete protection against harmful UVA and UVB rays"
  },
  {
    icon: "ri-eye-line",
    title: "Polarized Lenses",
    description: "Reduce glare and enhance visual clarity in bright conditions"
  },
  {
    icon: "ri-award-line",
    title: "Premium Materials",
    description: "Crafted with high-quality acetate and titanium frames"
  },
  {
    icon: "ri-truck-line",
    title: "Free Shipping",
    description: "Complimentary worldwide shipping on all orders over $150"
  }
];

export default function SunglassesFeatures() {
  const scrollToCollection = () => {
    const collectionElement = document.getElementById('premium-collection');
    if (collectionElement) {
      collectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto group-hover:bg-gray-800 transition-colors">
                <i className={`${feature.icon} w-8 h-8 flex items-center justify-center`}></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="relative rounded-2xl overflow-hidden p-12 text-center text-white"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Luxury%20sunglasses%20lifestyle%20photography%2C%20person%20wearing%20premium%20eyewear%20in%20elegant%20urban%20setting%2C%20sophisticated%20black%20and%20white%20composition%20with%20dramatic%20lighting&width=1200&height=400&seq=sunglasses-cta&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-black">FIND YOUR PERFECT PAIR</h2>
            <p className="text-xl">
              Discover our complete collection of luxury sunglasses with expert styling advice
            </p>
            <div className="flex justify-center">
              <button 
                onClick={scrollToCollection}
                className="bg-white text-black px-8 py-4 font-bold text-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
