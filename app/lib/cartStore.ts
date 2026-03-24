
'use client';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

class CartStore {
  private cartItems: CartItem[] = [];
  private wishlistItems: WishlistItem[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    try {
      const savedCart = localStorage.getItem('shopping-cart');
      const savedWishlist = localStorage.getItem('wishlist');
      
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      }
      
      if (savedWishlist) {
        this.wishlistItems = JSON.parse(savedWishlist);
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopping-cart', JSON.stringify(this.cartItems));
      localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
    
    // Dispatch custom events for header updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartCountUpdate', { 
        detail: { count: this.cartItems.length } 
      }));
      window.dispatchEvent(new CustomEvent('wishlistCountUpdate', { 
        detail: { count: this.wishlistItems.length } 
      }));
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Cart methods
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  addToCart(item: Omit<CartItem, 'quantity'>) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    
    this.saveToStorage();
    this.notifyListeners();
  }

  removeFromCart(id: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  updateCartQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }
    
    const item = this.cartItems.find(cartItem => cartItem.id === id);
    if (item) {
      item.quantity = quantity;
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  // Wishlist methods
  getWishlistItems(): WishlistItem[] {
    return [...this.wishlistItems];
  }

  getWishlistCount(): number {
    return this.wishlistItems.length;
  }

  addToWishlist(item: WishlistItem) {
    const exists = this.wishlistItems.some(wishlistItem => wishlistItem.id === item.id);
    if (!exists) {
      this.wishlistItems.push(item);
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  removeFromWishlist(id: string) {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  isInWishlist(id: string): boolean {
    return this.wishlistItems.some(item => item.id === id);
  }

  clearWishlist() {
    this.wishlistItems = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  // Move item from wishlist to cart
  moveToCart(id: string) {
    const wishlistItem = this.wishlistItems.find(item => item.id === id);
    if (wishlistItem) {
      this.addToCart(wishlistItem);
      this.removeFromWishlist(id);
    }
  }
}

export const cartStore = new CartStore();
