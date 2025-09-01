import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2025-01-20',
      status: 'Delivered',
      total: 24999,
      items: ['Wireless Headphones', 'Smartphone Case']
    },
    {
      id: 'ORD-002',
      date: '2025-01-15',
      status: 'In Transit',
      total: 7499,
      items: ['Classic Sneakers']
    },
    {
      id: 'ORD-003',
      date: '2025-01-10',
      status: 'Processing',
      total: 105999,
      items: ['Modern Laptop']
    }
  ];

  const mockWishlist = [
    {
      id: '1',
      name: 'Luxury Watch',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1561634343-3a2787687046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMGx1eHVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzU2NzA4MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '2',
      name: 'Coffee Maker',
      price: 20999,
      image: 'https://images.unsplash.com/photo-1607273177147-e7304c4d5d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlciUyMGtpdGNoZW58ZW58MXx8fHwxNzU2NjI5ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration
    if (registerForm.password === registerForm.confirmPassword) {
      setIsLoggedIn(true);
    } else {
      alert('Passwords do not match');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
    setRegisterForm({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'In Transit':
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>;
      case 'Processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle>
                {isRegistering ? 'Create Account' : 'Welcome Back'}
              </CardTitle>
              <p className="text-muted-foreground">
                {isRegistering 
                  ? 'Sign up to start shopping with us' 
                  : 'Sign in to your account to continue'
                }
              </p>
            </CardHeader>
            
            <CardContent>
              {isRegistering ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={registerForm.firstName}
                        onChange={(e) => setRegisterForm(prev => ({...prev, firstName: e.target.value}))}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={registerForm.lastName}
                        onChange={(e) => setRegisterForm(prev => ({...prev, lastName: e.target.value}))}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm(prev => ({...prev, email: e.target.value}))}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({...prev, password: e.target.value}))}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm(prev => ({...prev, confirmPassword: e.target.value}))}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({...prev, email: e.target.value}))}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({...prev, password: e.target.value}))}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                  {' '}
                  <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-primary hover:underline"
                  >
                    {isRegistering ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">My Account</h1>
          <p className="text-muted-foreground">Welcome back, John Doe!</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">12</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">24</p>
                    <p className="text-sm text-muted-foreground">Wishlist Items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">Gold</p>
                    <p className="text-sm text-muted-foreground">Member Status</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{order.id}</h4>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="font-semibold mt-1">₹{order.total.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <p className="text-muted-foreground">Placed on {order.date}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(order.status)}
                        <p className="font-semibold text-lg mt-1">₹{order.total.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Items:</h4>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm text-muted-foreground">• {item}</p>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 mt-4">
                      <Button variant="outline" size="sm">View Details</Button>
                      {order.status === 'Delivered' && (
                        <Button variant="outline" size="sm">Reorder</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockWishlist.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="font-semibold text-primary">${item.price}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm">Add to Cart</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Home</h4>
                      <Badge variant="secondary">Default</Badge>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>New York, NY 10001</p>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input defaultValue="John" />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input defaultValue="Doe" />
                </div>
              </div>
              
              <div>
                <Label>Email</Label>
                <Input defaultValue="john.doe@example.com" />
              </div>
              
              <div>
                <Label>Phone</Label>
                <Input defaultValue="(555) 123-4567" />
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};