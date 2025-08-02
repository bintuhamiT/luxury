import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb.jsx';
import { Button } from '@/components/ui/button.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@/components/ui/label.jsx';
import { AspectRatio } from '@/components/ui/aspect-ratio.jsx';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination.jsx';
import { Star, ShoppingCart, Eye, ArrowRight, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { useToast } from '@/components/ui/use-toast';

function ProductsSection({
  products,
  filters,
  setFilters,
  sortOption,
  setSortOption,
  currentPage,
  setCurrentPage,
  productsPerPage,
  handleProductsPerPageChange,
  isLoading,
  addToCart,
  viewProductDetails,
  viewAllProducts,
  handlePageChange,
}) {
  const { toast } = useToast();
  const [selectedOptions, setSelectedOptions] = useState({});

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!filters.new && !filters.sale) return true;
      if (filters.new && filters.sale) return product.isNew && product.isSale;
      if (filters.new) return product.isNew;
      if (filters.sale) return product.isSale;
      return false;
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOption === 'price-low') {
        return parseFloat(a.price.replace(' ريال', '').replace(',', '')) - parseFloat(b.price.replace(' ريال', '').replace(',', ''));
      }
      if (sortOption === 'price-high') {
        return parseFloat(b.price.replace(' ريال', '').replace(',', '')) - parseFloat(a.price.replace(' ريال', '').replace(',', ''));
      }
      if (sortOption === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [filteredProducts, sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleAddToCart = (product) => {
    const productOptions = selectedOptions[product.id] || {};
    const selectedSize = productOptions.size || (product.sizes && product.sizes[0]);
    const selectedColor = productOptions.color || (product.colors && product.colors[0]);
    
    addToCart(product, selectedSize, selectedColor);
    
    toast({
      title: 'تمت الإضافة بنجاح',
      description: `${product.name} تمت إضافته إلى سلة التسوق`,
      duration: 3000,
    });
  };

  const handleQuickAddToCart = (product) => {
    const defaultSize = product.sizes && product.sizes[0];
    const defaultColor = product.colors && product.colors[0];
    
    addToCart(product, defaultSize, defaultColor);
    
    toast({
      title: 'إضافة سريعة',
      description: `${product.name} تمت إضافته بالخيارات الافتراضية`,
      duration: 2000,
    });
  };

  const updateProductOption = (productId, optionType, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [optionType]: value
      }
    }));
  };

  return (
    <section id="products" className="py-20 bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6 luxury-shadow animate-fade-in">
          <BreadcrumbList className="luxury-font-body">
            <BreadcrumbItem>
              <BreadcrumbLink href="#home" className="luxury-nav-link">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-muted-foreground">المنتجات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold luxury-font-heading luxury-text-gradient mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            المنتجات المميزة
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto luxury-font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            تشكيلة مختارة بعناية من أفضل القطع في مجموعتنا
          </motion.p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="luxury-checkbox-container">
            <RadioGroup
              defaultValue="all"
              onValueChange={(value) => {
                setFilters({
                  new: value === 'new',
                  sale: value === 'sale',
                });
                setCurrentPage(1);
              }}
              className="flex flex-wrap gap-4 animate-fade-in-up"
            >
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <RadioGroupItem value="all" id="all" className="luxury-checkbox" />
                <Label htmlFor="all" className="luxury-font-body cursor-pointer">الكل</Label>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <RadioGroupItem value="new" id="new-radio" className="luxury-checkbox" />
                <Label htmlFor="new-radio" className="luxury-font-body cursor-pointer">جديد</Label>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <RadioGroupItem value="sale" id="sale-radio" className="luxury-checkbox" />
                <Label htmlFor="sale-radio" className="luxury-font-body cursor-pointer">تخفيض</Label>
              </motion.div>
            </RadioGroup>
          </div>
          
          <Select
            value={sortOption}
            onValueChange={(value) => {
              setSortOption(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[200px] luxury-input animate-fade-in-up">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent className="luxury-menubar-content">
              <SelectItem value="default" className="luxury-menubar-item">الافتراضي</SelectItem>
              <SelectItem value="price-low" className="luxury-menubar-item">السعر: منخفض إلى مرتفع</SelectItem>
              <SelectItem value="price-high" className="luxury-menubar-item">السعر: مرتفع إلى منخفض</SelectItem>
              <SelectItem value="rating" className="luxury-menubar-item">التقييم</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <ScrollArea className="h-auto max-h-[800px] rounded-md border p-4 luxury-shadow luxury-carousel">
          {isLoading ? (
            <div className="text-center py-16">
              <motion.div
                className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
              <p className="text-muted-foreground luxury-font-body">جارٍ تحميل المنتجات...</p>
            </div>
          ) : (
            <>
              {currentProducts.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="luxury-product-card luxury-card overflow-hidden luxury-shadow-hover group">
                        <div className="relative">
                          <AspectRatio ratio={4 / 3}>
                            <motion.img
                              src={product.image}
                              alt={product.name}
                              className="luxury-product-image object-cover w-full h-full"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            />
                          </AspectRatio>
                          
                          {/* Product Overlay */}
                          <motion.div
                            className="luxury-product-overlay"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex flex-col gap-3">
                              <Button 
                                className="luxury-btn-gold touch-friendly"
                                onClick={() => viewProductDetails(product)}
                              >
                                <Eye className="w-4 h-4 ml-2" />
                                عرض التفاصيل
                              </Button>
                              <Button 
                                variant="outline"
                                className="luxury-btn-outline touch-friendly bg-white/90 hover:bg-white"
                                onClick={() => handleQuickAddToCart(product)}
                              >
                                <ShoppingCart className="w-4 h-4 ml-2" />
                                إضافة سريعة
                              </Button>
                            </div>
                          </motion.div>

                          {/* Product Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.isNew && (
                              <Badge
                                variant="secondary"
                                className="luxury-shadow animate-pulse bg-green-500 text-white"
                              >
                                جديد
                              </Badge>
                            )}
                            {product.isSale && (
                              <Badge
                                variant="destructive"
                                className="luxury-shadow animate-pulse"
                              >
                                تخفيض
                              </Badge>
                            )}
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold luxury-font-heading mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          
                          {/* Rating */}
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground mr-2">
                              ({product.reviews || 0})
                            </span>
                          </div>

                          {/* Product Options */}
                          {(product.sizes || product.colors) && (
                            <div className="space-y-3 mb-4">
                              {product.sizes && (
                                <Select
                                  value={selectedOptions[product.id]?.size || ''}
                                  onValueChange={(value) => updateProductOption(product.id, 'size', value)}
                                >
                                  <SelectTrigger className="luxury-input text-sm">
                                    <SelectValue placeholder="اختر المقاس" />
                                  </SelectTrigger>
                                  <SelectContent className="luxury-menubar-content">
                                    {product.sizes.map((size) => (
                                      <SelectItem key={size} value={size} className="luxury-menubar-item">
                                        {size}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              
                              {product.colors && (
                                <Select
                                  value={selectedOptions[product.id]?.color || ''}
                                  onValueChange={(value) => updateProductOption(product.id, 'color', value)}
                                >
                                  <SelectTrigger className="luxury-input text-sm">
                                    <SelectValue placeholder="اختر اللون" />
                                  </SelectTrigger>
                                  <SelectContent className="luxury-menubar-content">
                                    {product.colors.map((color) => (
                                      <SelectItem key={color} value={color} className="luxury-menubar-item">
                                        {color}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          )}

                          {/* Price and Add to Cart */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-accent">
                                {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {product.originalPrice}
                                </span>
                              )}
                            </div>
                            <Button 
                              size="sm" 
                              className="luxury-btn touch-friendly"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingCart className="w-4 h-4 ml-2" />
                              أضف للسلة
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center text-muted-foreground py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-lg luxury-font-body">لا توجد منتجات تطابق الفلاتر المحددة</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setFilters({ new: false, sale: false });
                      setSortOption('default');
                    }}
                  >
                    إعادة تعيين الفلاتر
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </ScrollArea>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Pagination className="luxury-pagination mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                        handlePageChange && handlePageChange(currentPage - 1);
                      }
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'luxury-btn touch-friendly'}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#products"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                        handlePageChange && handlePageChange(page);
                      }}
                      className="luxury-btn touch-friendly"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                
                <PaginationItem>
                  <PaginationNext
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                        handlePageChange && handlePageChange(currentPage + 1);
                      }
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'luxury-btn touch-friendly'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}

        {/* View All Products Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            className="luxury-btn-outline text-lg px-12 py-6 touch-friendly"
            onClick={viewAllProducts}
          >
            عرض جميع المنتجات
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductsSection;

