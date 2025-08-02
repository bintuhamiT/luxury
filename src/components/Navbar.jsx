import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarSub, MenubarSubTrigger, MenubarSubContent } from '@/components/ui/menubar.jsx';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from '@/components/ui/sheet.jsx';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar.jsx';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion.jsx';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';

function Navbar({ isMenuOpen, setIsMenuOpen, setIsSearchOpen, setIsCartOpen, user, totalCartItems }) {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.luxury-nav');
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="luxury-nav sticky top-0 z-50 bg-background/90 backdrop-blur-md animate-nav-slide-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-18">
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold luxury-font-heading luxury-text-gradient">
              LUXE FASHION
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Menubar className="luxury-menubar bg-transparent border-none">
              <MenubarMenu value="home">
                <MenubarTrigger className="luxury-menubar-trigger text-sm lg:text-base">
                  الرئيسية
                </MenubarTrigger>
                <MenubarContent className="luxury-menubar-content bg-background/95 backdrop-blur-md">
                  <MenubarItem className="luxury-menubar-item text-sm">
                    <a href="#home">الصفحة الرئيسية</a>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu value="shop">
                <MenubarTrigger className="luxury-menubar-trigger text-sm lg:text-base">
                  التسوق
                </MenubarTrigger>
                <MenubarContent className="luxury-menubar-content bg-background/95 backdrop-blur-md">
                  <MenubarItem className="luxury-menubar-item text-sm">
                    <a href="#products">جميع المنتجات</a>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger className="luxury-menubar-item text-sm">
                      تصفح حسب الفئة
                    </MenubarSubTrigger>
                    <MenubarSubContent className="luxury-menubar-content bg-background/95 backdrop-blur-md">
                      <MenubarItem className="luxury-menubar-item text-sm">
                        <a href="#products">ملابس نسائية</a>
                      </MenubarItem>
                      <MenubarItem className="luxury-menubar-item text-sm">
                        <a href="#products">ملابس رجالية</a>
                      </MenubarItem>
                      <MenubarItem className="luxury-menubar-item text-sm">
                        <a href="#products">إكسسوارات</a>
                      </MenubarItem>
                      <MenubarItem className="luxury-menubar-item text-sm">
                        <a href="#products">أحذية</a>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu value="about">
                <MenubarTrigger className="luxury-menubar-trigger text-sm lg:text-base">
                  من نحن
                </MenubarTrigger>
                <MenubarContent className="luxury-menubar-content bg-background/95 backdrop-blur-md">
                  <MenubarItem className="luxury-menubar-item text-sm">
                    <a href="#about">قصة العلامة التجارية</a>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu value="faq">
                <MenubarTrigger className="luxury-menubar-trigger text-sm lg:text-base">
                  الأسئلة الشائعة
                </MenubarTrigger>
                <MenubarContent className="luxury-menubar-content bg-background/95 backdrop-blur-md">
                  <MenubarItem className="luxury-menubar-item text-sm">
                    <a href="#faq">الأسئلة والإجابات</a>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu value="contact">
                <MenubarTrigger className="luxury-menubar-trigger text-sm lg:text-base">
                  تواصل معنا
                </MenubarTrigger>
                <MenubarContent className="luxury-menubar-content bg-background/95 backdrop-blur-md">
                  <MenubarItem className="luxury-menubar-item text-sm">
                    <a href="#contact">معلومات التواصل</a>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="luxury-btn-icon touch-friendly h-8 w-8 lg:h-9 lg:w-9 hover:bg-accent/20 smooth-transition"
              aria-label="البحث"
            >
              <Search className="h-4 w-4 lg:h-5 lg:w-5 text-accent" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="luxury-shadow cursor-pointer h-8 w-8 lg:h-9 lg:w-9">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="text-sm">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="luxury-menubar-content w-40 sm:w-48 bg-background/95 backdrop-blur-md">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" className="luxury-menubar-item justify-start text-sm">
                    الحساب
                  </Button>
                  <Button variant="ghost" className="luxury-menubar-item justify-start text-sm">
                    الإعدادات
                  </Button>
                  <Button variant="ghost" className="luxury-menubar-item justify-start text-sm">
                    تسجيل الخروج
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative luxury-btn-icon touch-friendly h-8 w-8 lg:h-9 lg:w-9 hover:bg-accent/20 smooth-transition"
              aria-label="فتح سلة التسوق"
            >
              <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5 text-accent" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse-cart bg-accent text-accent-foreground">
                  {totalCartItems}
                </Badge>
              )}
            </Button>
          </div>
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="luxury-btn-icon touch-friendly h-9 w-9"
              aria-label="البحث"
            >
              <Search className="h-5 w-5 text-accent" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative luxury-btn-icon touch-friendly h-9 w-9"
              aria-label="فتح سلة التسوق"
            >
              <ShoppingCart className="h-5 w-5 text-accent" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse-cart bg-accent text-accent-foreground">
                  {totalCartItems}
                </Badge>
              )}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(true)}
                  className="luxury-btn-icon touch-friendly h-9 w-9"
                  aria-label="القائمة"
                >
                  <Menu className="h-5 w-5 text-accent" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="luxury-sheet bg-background/90 backdrop-blur-md w-[80vw] sm:w-[60vw]">
                <SheetHeader className="relative pb-3">
                  <SheetTitle className="luxury-font-heading text-xl sm:text-2xl luxury-text-gradient animate-slide-in-up">
                    القائمة
                  </SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground luxury-font-body">
                    اختر وجهتك
                  </SheetDescription>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 left-2 luxury-btn-icon touch-friendly h-8 w-8 hover:bg-accent/20 smooth-transition"
                      aria-label="إغلاق القائمة"
                    >
                      <X className="h-5 w-5 animate-spin-on-hover text-accent" />
                    </Button>
                  </SheetClose>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-12rem)] py-3">
                  <div className="px-3 space-y-2">
                    <a
                      href="#home"
                      className="block px-3 py-2 luxury-nav-link text-base sm:text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors smooth-transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      الرئيسية
                    </a>
                    <a
                      href="#products"
                      className="block px-3 py-2 luxury-nav-link text-base sm:text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors smooth-transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      التسوق
                    </a>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="categories">
                        <AccordionTrigger className="px-3 py-2 luxury-nav-link text-base sm:text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors smooth-transition">
                          الفئات
                        </AccordionTrigger>
                        <AccordionContent className="pl-5 space-y-1">
                          <a
                            href="#products"
                            className="block px-3 py-1.5 luxury-nav-link text-sm sm:text-base hover:bg-accent/10 rounded-md transition-colors smooth-transition"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            ملابس نسائية
                          </a>
                          <a
                            href="#products"
                            className="block px-3 py-1.5 luxury-nav-link text-sm sm:text-base hover:bg-accent/10 rounded-md transition-colors smooth-transition"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            ملابس رجالية
                          </a>
                          <a
                            href="#products"
                            className="block px-3 py-1.5 luxury-nav-link text-sm sm:text-base hover:bg-accent/10 rounded-md transition-colors smooth-transition"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            إكسسوارات
                          </a>
                          <a
                            href="#products"
                            className="block px-3 py-1.5 luxury-nav-link text-sm sm:text-base hover:bg-accent/10 rounded-md transition-colors smooth-transition"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            أحذية
                          </a>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <a
                      href="#about"
                      className="block px-3 py-2 luxury-nav-link text-base sm:text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors smooth-transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      من نحن
                    </a>
                    <a
                      href="#faq"
                      className="block px-3 py-2 luxury-nav-link text-base sm:text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors smooth-transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      الأسئلة الشائعة
                    </a>
                    <a
                      href="#contact"
                      className="block px-3 py-2 luxury-nav-link text-base sm:text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors smooth-transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      تواصل معنا
                    </a>
                  </div>
                </ScrollArea>
                <SheetFooter className="mt-3">
                  <SheetClose asChild>
                    <Button className="luxury-btn-outline w-full touch-friendly text-sm sm:text-base">
                      إغلاق
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;