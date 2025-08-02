import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import CategoriesSection from './components/CategoriesSection.jsx';
import ProductsSection from './components/ProductsSection.jsx'; // استخدام النسخة المحسنة
import AboutSection from './components/AboutSection.jsx';
import FAQSection from './components/FAQSection.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SearchDialog from './components/SearchDialog.jsx';
import ProductDialog from './components/ProductDialog.jsx';
import { heroSlides, featuredProducts, categories, faqs, values } from './data.js';
import './App.css';
import './ProductsSection_improvements.css'; // إضافة التحسينات الجديدة

function App() {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filters, setFilters] = useState({ new: false, sale: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [productsPerPage, setProductsPerPage] = useState(6); // زيادة عدد المنتجات لكل صفحة

  // تحميل السلة من التخزين المحلي عند بدء التطبيق
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('خطأ في تحميل السلة من التخزين المحلي:', error);
        localStorage.removeItem('cart');
      }
    }
    
    // محاكاة تحميل البيانات
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(loadingTimer);
  }, []);

  // حفظ السلة في التخزين المحلي عند تغييرها
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('خطأ في حفظ السلة:', error);
    }
  }, [cart]);

  // إضافة منتج إلى السلة
  const addToCart = useCallback((product, size = null, color = null) => {
    if (!product || !product.id) {
      toast({
        title: 'خطأ',
        description: 'لا يمكن إضافة هذا المنتج إلى السلة',
        variant: 'destructive',
      });
      return;
    }

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
      
      return [...prev, { 
        ...product, 
        quantity: 1, 
        size: size || (product.sizes && product.sizes[0]) || null, 
        color: color || (product.colors && product.colors[0]) || null,
        addedAt: new Date().toISOString()
      }];
    });

    // فتح السلة تلقائياً عند إضافة منتج
    setIsCartOpen(true);
  }, [toast]);

  // تحديث كمية المنتج في السلة
  const updateCartQuantity = useCallback((productId, newQuantity, size = null, color = null) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }
    
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  // إزالة منتج من السلة
  const removeFromCart = useCallback((productId, size = null, color = null) => {
    setCart((prev) => prev.filter((item) => 
      !(item.id === productId && item.size === size && item.color === color)
    ));
    
    toast({
      title: 'تمت الإزالة',
      description: 'تم إزالة المنتج من سلة التسوق',
    });
  }, [toast]);

  // تفريغ السلة
  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart');
    toast({
      title: 'تم تفريغ السلة',
      description: 'تم إزالة جميع المنتجات من سلة التسوق',
    });
  }, [toast]);

  // حساب إجمالي السلة
  const calculateTotal = useCallback(() => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(' ريال', '').replace(',', ''));
        return total + (price * item.quantity);
      }, 0)
      .toFixed(2);
  }, [cart]);

  // حساب إجمالي عدد المنتجات في السلة
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // عرض تفاصيل المنتج
  const viewProductDetails = useCallback((product) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  }, []);

  // عرض جميع المنتجات
  const viewAllProducts = useCallback(() => {
    setFilters({ new: false, sale: false });
    setSortOption('default');
    setCurrentPage(1);
    
    // التمرير إلى قسم المنتجات
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // معالج تغيير الصفحة
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    
    // التمرير إلى أعلى قسم المنتجات
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: 'تم تغيير الصفحة',
      description: `أنت الآن في الصفحة ${page}`,
      duration: 2000,
    });
  }, [toast]);

  // معالج تغيير عدد المنتجات لكل صفحة
  const handleProductsPerPageChange = useCallback((value) => {
    setProductsPerPage(Number(value));
    setCurrentPage(1);
  }, []);

  // معالج البحث
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    // يمكن إضافة منطق البحث هنا
  }, []);

  // معالج إغلاق النوافذ المنبثقة عند الضغط على Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCartOpen(false);
        setIsProductDialogOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-background luxury-font-body">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsSearchOpen={setIsSearchOpen}
        setIsCartOpen={setIsCartOpen}
        user={{ name: 'المستخدم', image: '/favicon.ico' }}
        totalCartItems={totalCartItems}
      />
      
      <SearchDialog
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={handleSearch}
      />
      
      <CartDrawer
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        calculateTotal={calculateTotal}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
      
      <HeroSection 
        heroSlides={heroSlides} 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
      />
      
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

