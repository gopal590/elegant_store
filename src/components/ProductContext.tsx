import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  cartItemCount: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 10999,
    originalPrice: 14999,
    image: 'https://images.unsplash.com/photo-1609255386725-b9b6a8ad829c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc1NjY3MzA4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 1247,
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and studio-quality sound.',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Premium Smartphone',
    price: 65999,
    image: 'https://images.unsplash.com/photo-1641457474122-5bce8b622ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlJTIwY2xlYW58ZW58MXx8fHwxNzU2NzA4MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 892,
    description: 'Latest flagship smartphone with advanced camera system, lightning-fast processor, and all-day battery life.',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Modern Laptop',
    price: 105999,
    originalPrice: 124999,
    image: 'https://images.unsplash.com/photo-1754928864131-21917af96dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMG1vZGVybnxlbnwxfHx8fDE3NTY3MDgxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 634,
    description: 'Ultra-thin laptop with powerful performance, stunning display, and exceptional build quality.',
    inStock: true
  },
  {
    id: '4',
    name: 'Classic White Sneakers',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1625622176741-a21f738d0756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnMlMjB3aGl0ZXxlbnwxfHx8fDE3NTY3MDgxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fashion',
    rating: 4.3,
    reviewCount: 512,
    description: 'Timeless white sneakers with premium materials and all-day comfort. Perfect for any occasion.',
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Luxury Minimal Watch',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1561634343-3a2787687046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMGx1eHVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzU2NzA4MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fashion',
    rating: 4.7,
    reviewCount: 328,
    description: 'Elegant minimalist watch with precision Swiss movement and premium leather strap.',
    inStock: true
  },
  {
    id: '6',
    name: 'Premium Coffee Maker',
    price: 20999,
    image: 'https://images.unsplash.com/photo-1607273177147-e7304c4d5d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlciUyMGtpdGNoZW58ZW58MXx8fHwxNzU2NjI5ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Home & Kitchen',
    rating: 4.4,
    reviewCount: 756,
    description: 'Professional-grade coffee maker with precise temperature control and programmable settings.',
    inStock: true
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <ProductContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartItemCount
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};