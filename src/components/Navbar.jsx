import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarSub, MenubarSubTrigger, MenubarSubContent } from '@/components/ui/menubar.jsx';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from '@/components/ui/sheet.jsx';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar.jsx';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion.jsx';
import { Menu, X, Search, ShoppingCart, User, Settings, LogOut, Home, Package, Info, HelpCircle, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';

function Navbar({ isMenuOpen, setIsMenuOpen, setIsSearchOpen, setIsCartOpen, user, totalCartItems }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      // Update active section based on scroll position
      const sections = ['home', 'products', 'about', 'faq', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      key: 'home',
      label: 'الرئيسية',
      href: '#home',
      icon: Home,
      items: [
        { label: 'الصفحة الرئيسية', href: '#home' }
      ]
    },
    {
      key: 'shop',
      label: 'التسوق',
      href: '#products',
      icon: Package,
      items: [
        { label: 'جميع المنتجات', href: '#products' },
        { separator: true },
        {
          label: 'تصفح حسب الفئة',
          submenu: [
            { label: 'ملابس نسائية', href: '#products?category=women' },
            { label: 'ملابس رجالية', href: '#products?category=men' },
            { label: 'إكسسوارات', href: '#products?category=accessories' },
            { label: 'أحذية', href: '#products?category=shoes' }
          ]
        }
      ]
    },
    {
      key: 'about',
      label: 'من نحن',
      href: '#about',
      icon: Info,
      items: [
        { label: 'قصة العلامة التجارية', href: '#about' },
        { label: 'رؤيتنا ورسالتنا', href: '#about?section=vision' },
        { label: 'فريق العمل', href: '#about?section=team' }
      ]
    },
    {
      key: 'faq',
      label: 'الأسئلة الشائعة',
      href: '#faq',
      icon: HelpCircle,
      items: [
        { label: 'الأسئلة والإجابات', href: '#faq' },
        { label: 'سياسة الإرجاع', href: '#faq?section=returns' },
        { label: 'الشحن والتوصيل', href: '#faq?section=shipping' }
      ]
    },
    {
      key: 'contact',
      label: 'تواصل معنا',
      href: '#contact',
      icon: Phone,
      items: [
        { label: 'معلومات التواصل', href: '#contact' },
        { label: 'خدمة العملاء', href: '#contact?section=support' },
        { label: 'المتاجر', href: '#contact?section=stores' }
      ]
    }
  ];

  const userMenuItems = [
    { label: 'الحساب الشخصي', icon: User, action: () => console.log('Profile') },
    { label: 'الإعدادات', icon: Settings, action: () => console.log('Settings') },
    { separator: true },
    { label: 'تسجيل الخروج', icon: LogOut, action: () => console.log('Logout'), variant: 'destructive' }
  ];

  const handleNavClick = (href, sectionKey) => {
    setActiveSection(sectionKey);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`luxury-nav sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/98 backdrop-blur-lg shadow-lg border-b border-border/50' 
        : 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 group">
            <a href="#home" onClick={() => handleNavClick('#home', 'home')}>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold luxury-font-heading luxury-text-gradient transition-all duration-300 group-hover:scale-105">
                LUXE FASHION
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Menubar className="luxury-menubar bg-transparent border-none">
              {navigationItems.map((item) => (
                <MenubarMenu key={item.key} value={item.key}>
                  <MenubarTrigger 
                    className={`luxury-menubar-trigger text-sm xl:text-base px-4 py-2 relative transition-all duration-200 ${
                      activeSection === item.key 
                        ? 'text-accent bg-accent/10 font-semibold' 
                        : 'text-foreground hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {activeSection === item.key && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-accent rounded-full" />
                    )}
                  </MenubarTrigger>
                  <MenubarContent className="luxury-menubar-content bg-background/98 backdrop-blur-lg border border-border/50 shadow-xl min-w-48">
                    {item.items.map((subItem, index) => (
                      <React.Fragment key={index}>
                        {subItem.separator ? (
                          <MenubarSeparator className="my-1 bg-border/50" />
                        ) : subItem.submenu ? (
                          <MenubarSub>
                            <MenubarSubTrigger className="luxury-menubar-item text-sm px-3 py-2">
                              {subItem.label}
                            </MenubarSubTrigger>
                            <MenubarSubContent className="luxury-menubar-content bg-background/98 backdrop-blur-lg border border-border/50 shadow-xl">
                              {subItem.submenu.map((subSubItem, subIndex) => (
                                <MenubarItem key={subIndex} className="luxury-menubar-item text-sm px-3 py-2">
                                  <a 
                                    href={subSubItem.href}
                                    onClick={() => handleNavClick(subSubItem.href, item.key)}
                                    className="w-full block"
                                  >
                                    {subSubItem.label}
                                  </a>
                                </MenubarItem>
                              ))}
                            </MenubarSubContent>
                          </MenubarSub>
                        ) : (
                          <MenubarItem className="luxury-menubar-item text-sm px-3 py-2">
                            <a 
                              href={subItem.href}
                              onClick={() => handleNavClick(subItem.href, item.key)}
                              className="w-full block"
                            >
                              {subItem.label}
                            </a>
                          </MenubarItem>
                        )}
                      </React.Fragment>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="luxury-btn-icon touch-friendly h-10 w-10 hover:bg-accent/10 hover:scale-105 transition-all duration-200 group"
              aria-label="البحث"
            >
              <Search className="h-5 w-5 text-accent group-hover:text-accent transition-colors" />
            </Button>

            {/* User Avatar - Desktop Only */}
            <div className="hidden md:block">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="luxury-btn-icon p-1 h-10 w-10 hover:bg-accent/10 hover:scale-105 transition-all duration-200"
                    aria-label="حساب المستخدم"
                  >
                    <Avatar className="h-8 w-8 ring-2 ring-transparent hover:ring-accent/20 transition-all duration-200">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="text-sm font-semibold bg-accent/10 text-accent">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="luxury-menubar-content w-52 bg-background/98 backdrop-blur-lg border border-border/50 shadow-xl p-2">
                  <div className="flex flex-col space-y-1">
                    <div className="px-3 py-2 border-b border-border/30 mb-2">
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    {userMenuItems.map((menuItem, index) => (
                      <React.Fragment key={index}>
                        {menuItem.separator ? (
                          <div className="h-px bg-border/30 my-1" />
                        ) : (
                          <Button 
                            variant="ghost" 
                            className={`luxury-menubar-item justify-start text-sm px-3 py-2 h-auto ${
                              menuItem.variant === 'destructive' 
                                ? 'text-destructive hover:text-destructive hover:bg-destructive/10' 
                                : 'text-foreground hover:text-accent hover:bg-accent/10'
                            }`}
                            onClick={menuItem.action}
                          >
                            <menuItem.icon className="w-4 h-4 mr-2" />
                            {menuItem.label}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative luxury-btn-icon touch-friendly h-10 w-10 hover:bg-accent/10 hover:scale-105 transition-all duration-200 group"
              aria-label="سلة التسوق"
            >
              <ShoppingCart className="h-5 w-5 text-accent group-hover:text-accent transition-colors" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-accent text-accent-foreground animate-pulse-cart border-2 border-background">
                  {totalCartItems > 99 ? '99+' : totalCartItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="luxury-btn-icon touch-friendly h-10 w-10 hover:bg-accent/10 hover:scale-105 transition-all duration-200"
                    aria-label="القائمة"
                  >
                    <Menu className="h-5 w-5 text-accent" />
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="luxury-sheet bg-background/95 backdrop-blur-lg w-[85vw] sm:w-[70vw] max-w-sm border-l border-border/50"
                >
                  <SheetHeader className="relative pb-4 border-b border-border/30">
                    <SheetTitle className="luxury-font-heading text-xl sm:text-2xl luxury-text-gradient text-right">
                      القائمة الرئيسية
                    </SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground luxury-font-body text-right">
                      اختر وجهتك المفضلة
                    </SheetDescription>
                  </SheetHeader>

                  <ScrollArea className="h-[calc(100vh-12rem)] py-4">
                    <div className="space-y-2">
                      
                      {/* User Profile Section - Mobile */}
                      <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-border/30">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Avatar className="h-12 w-12 ring-2 ring-accent/20">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback className="text-lg font-bold bg-accent/10 text-accent">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 text-right">
                            <p className="text-sm font-semibold text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Items */}
                      {navigationItems.map((item) => (
                        <div key={item.key} className="space-y-1">
                          <a
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                              activeSection === item.key
                                ? 'bg-accent/10 text-accent font-semibold border border-accent/20'
                                : 'text-foreground hover:bg-accent/5 hover:text-accent'
                            }`}
                            onClick={() => handleNavClick(item.href, item.key)}
                          >
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                              <item.icon className="w-5 h-5" />
                              <span className="text-base font-medium">{item.label}</span>
                            </div>
                            {activeSection === item.key && (
                              <div className="w-2 h-2 bg-accent rounded-full" />
                            )}
                          </a>
                          
                          {/* Submenu for categories */}
                          {item.key === 'shop' && (
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="categories" className="border-none">
                                <AccordionTrigger className="px-4 py-2 text-sm text-muted-foreground hover:text-accent transition-colors rounded-lg hover:bg-accent/5">
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <Package className="w-4 h-4" />
                                    <span>الفئات</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pr-4 space-y-1">
                                  {item.items.find(i => i.submenu)?.submenu.map((subItem, index) => (
                                    <a
                                      key={index}
                                      href={subItem.href}
                                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-md transition-all duration-200"
                                      onClick={() => handleNavClick(subItem.href, item.key)}
                                    >
                                      {subItem.label}
                                    </a>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          )}
                        </div>
                      ))}

                      {/* User Actions - Mobile */}
                      <div className="pt-4 mt-6 border-t border-border/30 space-y-1">
                        {userMenuItems.map((menuItem, index) => (
                          <React.Fragment key={index}>
                            {menuItem.separator ? (
                              <div className="h-px bg-border/30 my-2" />
                            ) : (
                              <Button 
                                variant="ghost" 
                                className={`w-full justify-start text-sm px-4 py-3 h-auto rounded-lg transition-all duration-200 ${
                                  menuItem.variant === 'destructive' 
                                    ? 'text-destructive hover:text-destructive hover:bg-destructive/10' 
                                    : 'text-foreground hover:text-accent hover:bg-accent/10'
                                }`}
                                onClick={() => {
                                  menuItem.action();
                                  setIsMenuOpen(false);
                                }}
                              >
                                <menuItem.icon className="w-5 h-5 mr-3" />
                                {menuItem.label}
                              </Button>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>

                  <SheetFooter className="pt-4 border-t border-border/30">
                    <SheetClose asChild>
                      <Button className="luxury-btn-outline w-full touch-friendly text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                        إغلاق القائمة
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

