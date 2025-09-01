import React from 'react';
import { ArrowRight, Star, Smartphone, Shirt, Home, Quote } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ProductCard } from './ProductCard';
import { Product, useProducts } from './ProductContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { products } = useProducts();
  const featuredProducts = products.filter(product => product.featured);

  const categories = [
    {
      name: 'Electronics',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1730692504752-c411cf0306ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGNhdGVnb3J5JTIwaWNvbnxlbnwxfHx8fDE3NTY3MDgyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: '200+ Items'
    },
    {
      name: 'Fashion',
      icon: Shirt,
      image: 'https://images.unsplash.com/photo-1632773003373-6645a802c154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzU2NzA4MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: '150+ Items'
    },
    {
      name: 'Home & Kitchen',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1754732693535-7ffb5e1a51d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwa2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MXx8fHwxNzU2NjIwNjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: '100+ Items'
    }
  ];

  const testimonials = [
    {
      name: 'Rohan Sharma',
      rating: 5,
      comment: 'Amazing quality products and fast shipping. I\'ve been a customer for over a year now!',
      avatar: 'RS'
    },
    {
      name: 'Priya Mehta',
      rating: 5,
      comment: 'Great customer service and excellent product selection. Highly recommended!',
      avatar: 'PM'
    },
    {
      name: 'Arjun Patel',
      rating: 4,
      comment: 'Beautiful products and easy shopping experience. Will definitely shop here again.',
      avatar: 'AP'
    }
  ];

  const handleViewProduct = (product: Product) => {
    onNavigate('product-details', product.id);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted/30 to-muted/60 rounded-2xl overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="w-fit">Big Festive Sale - Up to 70% Off</Badge>
              <h1 className="text-4xl lg:text-6xl font-semibold leading-tight">
                Discover Premium
                <span className="block text-primary">Products</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Celebrate this festive season with our biggest sale of the year! Explore premium electronics, fashion, and home essentials at unbeatable prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="w-fit"
                  onClick={() => onNavigate('products')}
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" className="w-fit">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1691967057193-80a98a59b272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzaG9wcGluZyUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NTY2OTc1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern shopping lifestyle"
                className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're looking for in our carefully organized categories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
                onClick={() => onNavigate('products')}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked items just for you</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('products')}
            className="hidden sm:flex"
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewProduct}
            />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('products')}
          >
            View All Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - see what our satisfied customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-4">
                      <span className="font-semibold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-muted-foreground/30" />
                    <p className="text-muted-foreground pl-4">{testimonial.comment}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-semibold mb-4">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};