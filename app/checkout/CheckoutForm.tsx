'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cartStore, CartItem } from '../lib/cartStore';

export default function CheckoutForm() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    deliveryOption: 'standard',
    promoCode: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    setCartItems(cartStore.getCartItems());
    
    const unsubscribe = cartStore.subscribe(() => {
      setCartItems(cartStore.getCartItems());
    });

    return unsubscribe;
  }, []);

  // Add some sample items if cart is empty for demo
  useEffect(() => {
    if (cartItems.length === 0) {
      const sampleItems = [
        {
          id: '1',
          name: 'Premium Leather Handbag',
          price: 299.99,
          image: 'https://readdy.ai/api/search-image?query=luxury%20leather%20handbag%20elegant%20design%20premium%20quality%20fashion%20accessory%20sophisticated%20style%20beautiful%20craftsmanship%20modern%20luxury%20bag&width=400&height=400&seq=1&orientation=squarish',
          quantity: 1,
          category: 'handbags'
        },
        {
          id: '2',
          name: 'Designer Sunglasses',
          price: 189.50,
          image: 'https://readdy.ai/api/search-image?query=designer%20sunglasses%20luxury%20eyewear%20premium%20fashion%20accessory%20stylish%20modern%20design%20high%20quality%20elegant%20sophisticated%20sunglasses&width=400&height=400&seq=2&orientation=squarish',
          quantity: 2,
          category: 'sunglasses'
        },
        {
          id: '3',
          name: 'Swiss Luxury Watch',
          price: 899.99,
          image: 'https://readdy.ai/api/search-image?query=swiss%20luxury%20watch%20premium%20timepiece%20elegant%20design%20sophisticated%20craftsmanship%20high%20end%20watch%20beautiful%20luxury%20accessory&width=400&height=400&seq=3&orientation=squarish',
          quantity: 1,
          category: 'watches'
        }
      ];
      
      sampleItems.forEach(item => {
        cartStore.addToCart(item);
      });
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = formData.deliveryOption === 'express' ? 25 : (subtotal > 100 ? 0 : 15);
  const tax = subtotal * 0.08;
  const discount = promoApplied ? promoDiscount : 0;
  const total = subtotal + deliveryFee + tax - discount;

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePromoCode = () => {
    const validCodes = {
      'SAVE10': 10,
      'WELCOME15': 15,
      'FIRST20': 20
    };
    
    const code = formData.promoCode.toUpperCase();
    if (validCodes[code as keyof typeof validCodes]) {
      setPromoApplied(true);
      setPromoDiscount(validCodes[code as keyof typeof validCodes]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setOrderComplete(true);
    cartStore.clearCart();
    setIsSubmitting(false);
  };

  if (orderComplete) {
    const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const estimatedDelivery = formData.deliveryOption === 'express' ? '1-2 business days' : '3-5 business days';
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="bg-green-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
            <i className="ri-check-line w-12 h-12 flex items-center justify-center text-green-600"></i>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase! Your order has been successfully processed and you will receive a confirmation email shortly.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-8 mb-8 text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-bold text-gray-900">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="text-gray-900 capitalize">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Option:</span>
                <span className="text-gray-900 capitalize">{formData.deliveryOption} shipping</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="text-gray-900">{estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Address:</span>
                <span className="text-gray-900 text-right">
                  {formData.address}<br/>
                  {formData.city}, {formData.postalCode}<br/>
                  {formData.country}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap text-center"
            >
              Continue Shopping
            </Link>
            <button 
              onClick={() => window.print()}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Progress Steps */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                    <span className="font-medium text-gray-900">Information</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-gray-500">Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Payment</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-black h-2 rounded-full w-1/3"></div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-user-line w-5 h-5 flex items-center justify-center mr-3"></i>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                          errors.firstName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                          errors.lastName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-black"
                    />
                    <span className="text-sm text-gray-600">Subscribe to our newsletter for exclusive offers</span>
                  </label>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center mr-3"></i>
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                          errors.city ? 'border-red-300' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                          errors.postalCode ? 'border-red-300' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm pr-8 ${
                        errors.country ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    >
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="SG">Singapore</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-truck-line w-5 h-5 flex items-center justify-center mr-3"></i>
                  Delivery Options
                </h3>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.deliveryOption === 'standard' ? 'border-black bg-black/5' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="standard"
                      checked={formData.deliveryOption === 'standard'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-black mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Standard Shipping</span>
                        <span className="font-bold">{subtotal > 100 ? 'Free' : '$15.00'}</span>
                      </div>
                      <p className="text-sm text-gray-600">3-5 business days</p>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.deliveryOption === 'express' ? 'border-black bg-black/5' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="express"
                      checked={formData.deliveryOption === 'express'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-black mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Express Shipping</span>
                        <span className="font-bold">$25.00</span>
                      </div>
                      <p className="text-sm text-gray-600">1-2 business days</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-bank-card-line w-5 h-5 flex items-center justify-center mr-3"></i>
                  Payment Method
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-6 mb-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-black"
                      />
                      <span className="text-sm font-medium">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-black"
                      />
                      <span className="text-sm font-medium">PayPal</span>
                    </label>
                  </div>
                  
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="Card number"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                            errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                          }`}
                          required
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          name="cardName"
                          placeholder="Name on card"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                            errors.cardName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          required
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                              errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                            }`}
                            required
                          />
                          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm ${
                              errors.cvv ? 'border-red-300' : 'border-gray-300'
                            }`}
                            required
                          />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formData.paymentMethod === 'paypal' && (
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <i className="ri-paypal-line w-8 h-8 flex items-center justify-center text-blue-600 mx-auto mb-2"></i>
                      <p className="text-sm text-blue-800">You will be redirected to PayPal to complete your payment</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  `Complete Order - $${total.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg object-top"
                      />
                      <div className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                      <p className="text-red-600 font-bold text-sm">${item.price}</p>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    name="promoCode"
                    placeholder="Promo code"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handlePromoCode}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <div className="flex items-center space-x-2 text-green-600 text-sm">
                    <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
                    <span>Promo code applied: ${promoDiscount} off</span>
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  Try: SAVE10, WELCOME15, or FIRST20
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-green-700 text-sm p-3 bg-green-50 rounded-lg">
                  <i className="ri-truck-line w-4 h-4 flex items-center justify-center"></i>
                  <span className="font-medium">
                    {deliveryFee === 0 ? 'Free shipping included!' : `${formData.deliveryOption === 'express' ? 'Express' : 'Standard'} shipping: $${deliveryFee}`}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-blue-700 text-sm p-3 bg-blue-50 rounded-lg">
                  <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center"></i>
                  <span className="font-medium">Secure payment guaranteed</span>
                </div>
                
                <div className="flex items-center space-x-2 text-purple-700 text-sm p-3 bg-purple-50 rounded-lg">
                  <i className="ri-refresh-line w-4 h-4 flex items-center justify-center"></i>
                  <span className="font-medium">30-day return policy</span>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 mb-2">Need help?</p>
                <div className="flex justify-center space-x-4 text-xs">
                  <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center">
                    <i className="ri-phone-line w-3 h-3 mr-1"></i>
                    <span>Call us</span>
                  </a>
                  <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center">
                    <i className="ri-mail-line w-3 h-3 mr-1"></i>
                    <span>Email</span>
                  </a>
                  <button className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center">
                    <i className="ri-chat-1-line w-3 h-3 mr-1"></i>
                    <span>Live chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}