
'use client';

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: 'ri-phone-fill',
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM EST',
      action: 'tel:+15551234567'
    },
    {
      icon: 'ri-mail-fill',
      title: 'Email Us', 
      info: 'support@luxuryfashion.com',
      description: 'We respond within 24 hours',
      action: 'mailto:support@luxuryfashion.com'
    },
    {
      icon: 'ri-message-3-fill',
      title: 'Live Chat',
      info: 'Available 24/7',
      description: 'Instant assistance online',
      action: '#'
    },
    {
      icon: 'ri-map-pin-fill',
      title: 'Visit Our Store',
      info: '123 Fashion Avenue, NYC',
      description: 'Mon-Sun 10AM-8PM',
      action: '#'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">MORE WAYS TO CONNECT</h2>
          <p className="text-xl text-gray-600">
            Choose the most convenient way to reach our customer service team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-gray-50 hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className={`${method.icon} w-8 h-8 flex items-center justify-center`}></i>
              </div>
              
              <h3 className="text-xl font-bold text-black mb-2">{method.title}</h3>
              <p className="text-lg text-gray-900 font-medium mb-1">{method.info}</p>
              <p className="text-sm text-gray-600">{method.description}</p>
              
              <a 
                href={method.action}
                className="inline-block mt-4 text-black font-bold hover:text-gray-600 transition-colors cursor-pointer"
              >
                Get Help →
              </a>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-black mb-4">FREQUENTLY ASKED QUESTIONS</h3>
            <p className="text-lg text-gray-600">Find quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6">
                <h4 className="font-bold text-lg text-black mb-2">What is your return policy?</h4>
                <p className="text-gray-600">We offer a 30-day return policy for all items in original condition with tags attached.</p>
              </div>
              
              <div className="bg-gray-50 p-6">
                <h4 className="font-bold text-lg text-black mb-2">How long does shipping take?</h4>
                <p className="text-gray-600">Standard shipping takes 3-5 business days. Express shipping options are available at checkout.</p>
              </div>
              
              <div className="bg-gray-50 p-6">
                <h4 className="font-bold text-lg text-black mb-2">Do you offer international shipping?</h4>
                <p className="text-gray-600">Yes, we ship worldwide. International shipping rates and times vary by destination.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6">
                <h4 className="font-bold text-lg text-black mb-2">How can I track my order?</h4>
                <p className="text-gray-600">Once your order ships, you'll receive a tracking number via email to monitor your package.</p>
              </div>
              
              <div className="bg-gray-50 p-6">
                <h4 className="font-bold text-lg text-black mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600">We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience.</p>
              </div>
              
              <div className="bg-gray-50 p-6">
                <h4 className="font-bold text-lg text-black mb-2">Do you have a size guide?</h4>
                <p className="text-gray-600">Yes, detailed size guides are available on each product page to help you find the perfect fit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
