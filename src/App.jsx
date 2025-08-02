import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import CategoriesSection from './components/CategoriesSection.jsx';
import ProductsSection from './components/ProductsSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import FAQSection from './components/FAQSection.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SearchDialog from './components/SearchDialog.jsx'; // Fixed typo: SerachDialog -> SearchDialog
import ProductDialog from './components/ProductDialog.jsx';
import { heroSlides, featuredProducts, categories, faqs, values } from './data.js';
import './App.css';

function App() {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Added state for cart drawer
  const [filters, setFilters] = useState({ new: false, sale: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [productsPerPage, setProductsPerPage] = useState(3);

  // Load cart from Local Storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Save cart to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    toast({
      title: favorites.includes(productId) ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة',
      description: 'تم تحديث قائمة المفضلة.',
    });
  };

  const addToCart = (product, size = null, color = null) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.size === size && item.color === color
      );
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, size, color }];
    });
    toast({
      title: 'تمت الإضافة إلى السلة',
      description: `${product.name} تمت إضافته إلى سلة التسوق.`,
    });
    setIsCartOpen(true); // Open cart drawer when adding an item
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    toast({
      title: 'تمت الإزالة من السلة',
      description: 'تم إزالة المنتج من سلة التسوق.',
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    toast({
      title: 'تم تفريغ السلة',
      description: 'تم إزالة جميع المنتجات من سلة التسوق.',
    });
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(' ريال', '').replace(',', ''));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  };

  const viewAllProducts = () => {
    setFilters({ new: false, sale: false });
    setSortOption('default');
    setCurrentPage(1);
  };

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      toast({
        title: 'تم تغيير الصفحة',
        description: `أنت الآن في الصفحة ${page}`,
        duration: 2000,
      });
    },
    [toast]
  );

  const handleProductsPerPageChange = useCallback((value) => {
    setProductsPerPage(Number(value));
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-background luxury-font-body">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsSearchOpen={setIsSearchOpen}
        setIsCartOpen={setIsCartOpen} // Pass setIsCartOpen to Navbar
        user={{ name: 'Ababil', image: '/favicon.ico' }}
        totalCartItems={totalCartItems}
      />
      <SearchDialog
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <CartDrawer
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        calculateTotal={calculateTotal}
        isCartOpen={isCartOpen} // Pass isCartOpen
        setIsCartOpen={setIsCartOpen} // Pass setIsCartOpen
      />
      <HeroSection heroSlides={heroSlides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      <CategoriesSection categories={categories} />
      <ProductsSection
        products={featuredProducts}
        filters={filters}
        setFilters={setFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        handleProductsPerPageChange={handleProductsPerPageChange}
        isLoading={isLoading}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        addToCart={addToCart}
        viewProductDetails={viewProductDetails}
        viewAllProducts={viewAllProducts}
        handlePageChange={handlePageChange}
      />
      <ProductDialog
        isProductDialogOpen={isProductDialogOpen}
        setIsProductDialogOpen={setIsProductDialogOpen}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
      />
      <AboutSection values={values} />
      <FAQSection faqs={faqs} />
      <Footer />
    </div>
  );
}

export default App;