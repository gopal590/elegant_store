import React, { useState } from 'react';
import { ProductProvider } from './components/ProductContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPage } from './components/AccountPage';

type Page = 'home' | 'products' | 'product-details' | 'cart' | 'checkout' | 'account' | 'categories' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleNavigate = (page: string, productId?: string) => {
    setCurrentPage(page as Page);
    if (productId) {
      setSelectedProductId(productId);
    } else {
      setSelectedProductId(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
      case 'categories':
        return <ProductListingPage onNavigate={handleNavigate} />;
      case 'product-details':
        if (selectedProductId) {
          return <ProductDetailsPage productId={selectedProductId} onNavigate={handleNavigate} />;
        }
        return <HomePage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigate} />;
      case 'about':
        return (
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-semibold mb-6">About ElegantStore</h1>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg">
                  Welcome to ElegantStore, your premier destination for high-quality products that combine style, functionality, and exceptional value.
                </p>
                <p>
                  Founded with a passion for bringing you the finest selection of electronics, fashion, and home essentials, we carefully curate each item in our collection to ensure it meets our rigorous standards of quality and design excellence.
                </p>
                <p>
                  Our mission is to make premium products accessible to everyone, offering competitive prices without compromising on quality or customer service. We believe that great shopping experiences start with great products, and we're committed to delivering both.
                </p>
                <p>
                  Thank you for choosing ElegantStore. We're honored to be part of your shopping journey and look forward to serving you with excellence in every interaction.
                </p>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-semibold mb-8 text-center">Contact Us</h1>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Get in Touch</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p><strong>Address:</strong><br />Shop No. 123, Commercial Complex<br />Banjara Hills, Hyderabad 500034</p>
                    <p><strong>Phone:</strong><br />+91 70956 94202</p>
                    <p><strong>Email:</strong><br />hello@elegantstore.in</p>
                    <p><strong>Hours:</strong><br />Mon-Sat: 10AM-8PM<br />Sunday: 11AM-7PM</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Send a Message</h3>
                  <form className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <textarea 
                      placeholder="Your Message" 
                      rows={4}
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                    <button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ProductProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </ProductProvider>
  );
}