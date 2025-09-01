import React, { useState } from 'react';
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ProductCard } from './ProductCard';
import { Product, useProducts } from './ProductContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailsPageProps {
  productId: string;
  onNavigate: (page: string, productId?: string) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ productId, onNavigate }) => {
  const { products, addToCart } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
          <Button onClick={() => onNavigate('products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  // Mock additional images (in a real app, these would come from the product data)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const mockReviews = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      rating: 5,
      date: 'January 15, 2025',
      comment: 'Excellent product! Quality is outstanding and delivery was super fast.',
      verified: true
    },
    {
      id: '2',
      name: 'Sneha Singh',
      rating: 4,
      date: 'January 10, 2025',
      comment: 'Very good product. Exactly as described. Would recommend!',
      verified: true
    },
    {
      id: '3',
      name: 'Vikram Gupta',
      rating: 5,
      date: 'January 5, 2025',
      comment: 'Amazing quality and great customer service. Will buy again!',
      verified: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-primary">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('products')} className="hover:text-primary">Products</button>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl bg-muted">
            <ImageWithFallback
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image thumbnails */}
          <div className="flex space-x-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {discountPercentage > 0 && (
                <Badge variant="destructive">-{discountPercentage}%</Badge>
              )}
            </div>
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`w-5 h-5 ${
                      star <= product.rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over ₹999</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">2 Year Warranty</p>
              <p className="text-xs text-muted-foreground">Full coverage</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                <RotateCcw className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">30-Day Returns</p>
              <p className="text-xs text-muted-foreground">No questions asked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Card className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({mockReviews.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="p-6">
            <div className="prose max-w-none">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              <p>
                This premium product combines cutting-edge technology with elegant design. 
                Crafted with the highest quality materials and attention to detail, it delivers 
                exceptional performance and durability.
              </p>
              <h4>Key Features</h4>
              <ul>
                <li>Premium build quality</li>
                <li>Advanced technology</li>
                <li>User-friendly design</li>
                <li>Long-lasting durability</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4">General</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Brand:</span>
                    <span>ElegantStore</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU:</span>
                    <span>ES-{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span>1.2 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span>10 x 8 x 2 inches</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>Premium Grade</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warranty:</span>
                    <span>2 Years</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="p-6">
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium">{review.name}</h5>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onViewDetails={(product) => onNavigate('product-details', product.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};