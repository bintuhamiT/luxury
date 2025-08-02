import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb.jsx';
import { Button } from '@/components/ui/button.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@/components/ui/label.jsx';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuSeparator } from '@/components/ui/context-menu.jsx';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover.jsx';
import { AspectRatio } from '@/components/ui/aspect-ratio.jsx';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination.jsx';
import { Star, Heart, Mail, ArrowRight } from 'lucide-react';
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
  favorites,
  toggleFavorite,
  addToCart,
  viewProductDetails,
  viewAllProducts,
  handlePageChange,
}) {
  const { toast } = useToast();

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

  return (
    <section id="products" className="py-20 bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading luxury-text-gradient mb-4 animate-slide-in-up">
            المنتجات المميزة
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto luxury-font-body animate-fade-in">
            تشكيلة مختارة بعناية من أفضل القطع في مجموعتنا
          </p>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="luxury-checkbox-container flex space-x-4">
            <RadioGroup
              defaultValue="all"
              onValueChange={(value) => {
                setFilters({
                  new: value === 'new',
                  sale: value === 'sale',
                });
                setCurrentPage(1);
              }}
              className="flex space-x-4 animate-fade-in-up"
            >
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <RadioGroupItem value="all" id="all" className="luxury-checkbox" />
                <Label htmlFor="all" className="luxury-font-body">الكل</Label>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <RadioGroupItem value="new" id="new-radio" className="luxury-checkbox" />
                <Label htmlFor="new-radio" className="luxury-font-body">جديد</Label>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <RadioGroupItem value="sale" id="sale-radio" className="luxury-checkbox" />
                <Label htmlFor="sale-radio" className="luxury-font-body">تخفيض</Label>
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
            <SelectTrigger className="w-[180px] luxury-input animate-fade-in-up">
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
        <ScrollArea className="h-[600px] rounded-md border p-4 luxury-shadow luxury-carousel">
          {isLoading ? (
            <div className="text-center py-8">
              <motion.div
                className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
              <p className="mt-4 text-muted-foreground">جارٍ تحميل المنتجات...</p>
            </div>
          ) : (
            <>
              {currentProducts.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentProducts.map((product) => (
                    <ContextMenu key={product.id}>
                      <ContextMenuTrigger>
                        <Card className="luxury-product-card luxury-card overflow-hidden luxury-shadow-hover group">
                          <div className="relative">
                            <Popover defaultOpen={false}>
                              <PopoverTrigger asChild>
                                <AspectRatio ratio={4 / 3}>
                                  <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="luxury-product-image object-cover w-full h-full"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </AspectRatio>
                              </PopoverTrigger>
                              <PopoverContent className="luxury-hover-card">
                                <h3 className="text-lg font-semibold luxury-font-heading mb-2">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {product.description}
                                </p>
                                <div className="flex items-center mb-2">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < Math.floor(product.rating)
                                            ? 'text-accent fill-current'
                                            : 'text-muted-foreground'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-muted-foreground mr-2">
                                    ({product.reviews})
                                  </span>
                                </div>
                                <div className="space-y-2">
                                  <Select
                                    onValueChange={(value) => setSelectedProduct({ ...product, size: value })}
                                  >
                                    <SelectTrigger className="luxury-input">
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
                                  <Select
                                    onValueChange={(value) => setSelectedProduct({ ...product, color: value })}
                                  >
                                    <SelectTrigger className="luxury-input">
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
                                  <Button
                                    className="luxury-btn-gold w-full touch-friendly"
                                    onClick={() => {
                                      addToCart(product, product.size || product.sizes[0], product.color || product.colors[0]);
                                      toast({
                                        title: 'تمت الإضافة بسرعة',
                                        description: `${product.name} تمت إضافته إلى السلة.`,
                                      });
                                    }}
                                  >
                                    إضافة سريعة
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <motion.div
                              className="luxury-product-overlay"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Button 
                                className="luxury-btn-gold touch-friendly"
                                onClick={() => viewProductDetails(product)}
                              >
                                عرض التفاصيل
                              </Button>
                            </motion.div>
                            {product.isNew && (
                              <Badge
                                variant="secondary"
                                className="absolute top-4 left-4 luxury-shadow animate-pulse"
                              >
                                جديد
                              </Badge>
                            )}
                            {product.isSale && (
                              <Badge
                                variant="destructive"
                                className="absolute top-4 right-4 luxury-shadow animate-pulse"
                              >
                                تخفيض
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-4 right-12 bg-white/80 hover:bg-white touch-friendly"
                              onClick={() => toggleFavorite(product.id)}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  favorites.includes(product.id)
                                    ? 'fill-current text-accent'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-4 right-4 bg-white/80 hover:bg-white touch-friendly"
                              onClick={() => {
                                toast({
                                  title: 'تمت المشاركة',
                                  description: `تمت مشاركة ${product.name} عبر البريد الإلكتروني.`,
                                });
                              }}
                            >
                              <Mail className="h-4 w-4 text-accent" />
                            </Button>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold luxury-font-heading mb-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(product.rating)
                                        ? 'text-accent fill-current'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground mr-2">
                                ({product.reviews})
                              </span>
                            </div>
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
                                onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                              >
                                أضف للسلة
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="luxury-context-menu">
                        <ContextMenuItem
                          className="luxury-context-menu-item"
                          onSelect={() => toggleFavorite(product.id)}
                        >
                          {favorites.includes(product.id)
                            ? 'إزالة من المفضلة'
                            : 'إضافة إلى المفضلة'}
                          <ContextMenuShortcut>
                            <Heart className="h-4 w-4" />
                          </ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem
                          className="luxury-context-menu-item"
                          onSelect={() => {
                            toast({
                              title: 'تمت المشاركة',
                              description: `تمت مشاركة ${product.name} عبر البريد الإلكتروني.`,
                            });
                          }}
                        >
                          مشاركة المنتج
                          <ContextMenuShortcut>
                            <Mail className="h-4 w-4" />
                          </ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem
                          className="luxury-context-menu-item"
                          onSelect={() => viewProductDetails(product)}
                        >
                          عرض التفاصيل
                          <ContextMenuShortcut>عرض</ContextMenuShortcut>
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center text-muted-foreground py-8 animate-fade-in">
                  لا توجد منتجات تطابق الفلاتر المحددة.
                </div>
              )}
            </>
          )}
        </ScrollArea>
        {totalPages > 1 && (
          <Pagination className="luxury-pagination mt-12 animate-fade-in-up">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'luxury-btn touch-friendly'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        <div className="text-center mt-12">
          <Button 
            className="luxury-btn-outline text-lg px-12 py-6 touch-friendly animate-slide-in-up"
            onClick={viewAllProducts}
          >
            عرض جميع المنتجات
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;