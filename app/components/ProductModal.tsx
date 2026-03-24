
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cartStore } from '../lib/cartStore';

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    for (let i = 0; i < selectedQuantity; i++) {
      cartStore.addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.salePrice || product.price,
        image: product.image,
        category: product.category || 'product'
      });
    }
    
    setTimeout(() => {
      setIsAddingToCart(false);
      onClose();
    }, 800);
  };

  const handleAddToWishlist = () => {
    setIsAddingToWishlist(true);
    
    const productItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      category: product.category || 'product'
    };

    if (cartStore.isInWishlist(product.id.toString())) {
      cartStore.removeFromWishlist(product.id.toString());
    } else {
      cartStore.addToWishlist(productItem);
    }
    
    setTimeout(() => {
      setIsAddingToWishlist(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors cursor-pointer"
        >
          <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative aspect-square bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center"
            />
            
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-amber-400 text-black px-3 py-1 text-sm font-bold">
                NEW
              </div>
            )}
            
            {product.discount && product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold">
                {product.discount}% OFF
              </div>
            )}
          </div>

          <div className="p-8 lg:p-12 space-y-6">
            <div>
              {product.brand && (
                <p className="text-amber-600 font-bold text-sm uppercase tracking-wider mb-2">
                  {product.brand}
                </p>
              )}
              <h2 className="text-3xl font-black text-black mb-4">{product.name}</h2>
              
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-black">
                  ${(product.salePrice || product.price).toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="font-bold text-black mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 font-medium transition-all cursor-pointer whitespace-nowrap ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-bold text-black mb-3">Quantity</h4>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black transition-colors cursor-pointer"
                >
                  <i className="ri-subtract-line"></i>
                </button>
                <span className="text-lg font-bold w-12 text-center">{selectedQuantity}</span>
                <button
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black transition-colors cursor-pointer"
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>
            </div>

            {product.features && product.features.length > 0 && (
              <div>
                <h4 className="font-bold text-black mb-3">Features</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-700">
                      <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-600"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full bg-black text-white py-4 font-bold text-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer whitespace-nowrap relative overflow-hidden ${
                  isAddingToCart ? 'animate-pulse' : ''
                }`}
              >
                {isAddingToCart && (
                  <div className="absolute inset-0 bg-green-600 animate-ping opacity-30"></div>
                )}
                <span className="relative z-10">
                  {isAddingToCart ? 'ADDING TO CART...' : 'ADD TO CART'}
                </span>
              </button>
              
              <button
                onClick={handleAddToWishlist}
                disabled={isAddingToWishlist}
                className={`w-full border-2 border-black text-black py-4 font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center space-x-2 ${
                  isAddingToWishlist ? 'animate-pulse' : ''
                }`}
              >
                <i className={`w-5 h-5 flex items-center justify-center ${
                  cartStore.isInWishlist(product.id.toString()) ? 'ri-heart-fill text-red-600' : 'ri-heart-line'
                }`}></i>
                <span>
                  {cartStore.isInWishlist(product.id.toString()) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
