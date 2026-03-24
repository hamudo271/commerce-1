
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.message.length > 500) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await fetch('https://readdy.ai/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          id: 'luxury-contact-form',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">SEND US A MESSAGE</h2>
          <p className="text-xl text-gray-600">
            Have a question about our products or need assistance? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white shadow-2xl p-8 md:p-12">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line w-8 h-8 flex items-center justify-center text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form id="luxury-contact-form" onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pr-8 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select a subject</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Order Support">Order Support</option>
                  <option value="Return & Exchange">Return & Exchange</option>
                  <option value="Size Guide">Size Guide</option>
                  <option value="Shipping Information">Shipping Information</option>
                  <option value="VIP Services">VIP Services</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  Message * ({formData.message.length}/500 characters)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-vertical"
                  placeholder="Tell us how we can help you..."
                />
                {formData.message.length >= 450 && (
                  <p className="text-sm text-orange-600 mt-1">
                    You have {500 - formData.message.length} characters remaining
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || formData.message.length > 500}
                  className="bg-black text-white px-8 py-4 font-bold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                  className="border border-gray-300 text-gray-700 px-8 py-4 font-bold hover:border-black hover:text-black transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  CLEAR FORM
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
