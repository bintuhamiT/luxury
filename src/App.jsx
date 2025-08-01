import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Search, 
  Heart,
  Star,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion.jsx'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert.jsx'
import { AspectRatio } from '@/components/ui/aspect-ratio.jsx'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar.jsx'
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb.jsx'
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible.jsx'
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem, 
  CommandShortcut 
} from '@/components/ui/command.jsx'
import { 
  ContextMenu, 
  ContextMenuTrigger, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuSeparator, 
  ContextMenuShortcut 
} from '@/components/ui/context-menu.jsx'
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog.jsx'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from '@/components/ui/drawer.jsx'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover.jsx'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '@/components/ui/input-otp.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from '@/components/ui/menubar.jsx'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from '@/components/ui/pagination.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet.jsx'
import { useToast } from '@/components/ui/use-toast'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx'
import './App.css'

function App() {
  const { toast } = useToast()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [user, setUser] = useState({
    name: "Ababil",
    image: "/favicon.ico"
  })
  const [filters, setFilters] = useState({
    new: false,
    sale: false,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState('default')
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from Local Storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    // Simulate loading for realism
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  // Save cart to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const heroSlides = [
    {
      title: "مجموعة الخريف الجديدة",
      subtitle: "اكتشف أحدث صيحات الموضة",
      description: "تشكيلة فاخرة من الملابس العصرية المصممة خصيصاً لك",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "الأناقة الكلاسيكية",
      subtitle: "طابع خالد وعصري",
      description: "قطع أساسية تجمع بين الراحة والأناقة لإطلالة مثالية",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      title: "تصاميم حصرية",
      subtitle: "من إبداع فريق Ababil",
      description: "قطع مميزة ومحدودة الإصدار تعكس ذوقك الرفيع",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "فستان سهرة أنيق",
      price: "1,299 ريال",
      originalPrice: "1,599 ريال",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      description: "فستان سهرة مصمم من الحرير الفاخر مع تفاصيل مطرزة يدويًا.",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isSale: true,
      sizes: ['S', 'M', 'L'],
      colors: ['أسود', 'أحمر', 'ذهبي']
    },
    {
      id: 2,
      name: "بدلة رجالية كلاسيكية",
      price: "2,499 ريال",
      originalPrice: "",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80",
      description: "بدلة مصممة بدقة لإطلالة أنيقة ومريحة في جميع المناسبات.",
      rating: 4.9,
      reviews: 89,
      isNew: false,
      isSale: false,
      sizes: ['M', 'L', 'XL'],
      colors: ['أزرق داكن', 'رمادي']
    },
    {
      id: 3,
      name: "حقيبة يد فاخرة",
      price: "899 ريال",
      originalPrice: "1,199 ريال",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
      description: "حقيبة يد مصنوعة من الجلد الطبيعي مع تصميم عصري.",
      rating: 4.7,
      reviews: 156,
      isNew: true,
      isSale: true,
      sizes: ['One Size'],
      colors: ['أسود', 'بيج']
    },
    {
      id: 4,
      name: "معطف شتوي أنيق",
      price: "1,799 ريال",
      originalPrice: "",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fEVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80",
      description: "معطف شتوي دافئ بتصميم كلاسيكي يناسب الأجواء الباردة.",
      rating: 4.6,
      reviews: 73,
      isNew: false,
      isSale: false,
      sizes: ['M', 'L', 'XL'],
      colors: ['أسود', 'كحلي']
    },
    {
      id: 5,
      name: "فستان كاجوال عصري",
      price: "699 ريال",
      originalPrice: "899 ريال",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1086&q=80",
      description: "فستان كاجوال مثالي للإطلالات اليومية بتصميم مريح.",
      rating: 4.5,
      reviews: 92,
      isNew: true,
      isSale: true,
      sizes: ['S', 'M', 'L'],
      colors: ['أبيض', 'أزرق']
    },
    {
      id: 6,
      name: "حذاء رياضي فاخر",
      price: "1,299 ريال",
      originalPrice: "",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fEVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80",
      description: "حذاء رياضي فاخر يجمع بين الأناقة والراحة.",
      rating: 4.8,
      reviews: 201,
      isNew: false,
      isSale: false,
      sizes: ['40', '41', '42', '43'],
      colors: ['أبيض', 'أسود']
    }
  ]

  const categories = [
    {
      name: "ملابس نسائية",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      count: "250+ قطعة"
    },
    {
      name: "ملابس رجالية",
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
      count: "180+ قطعة"
    },
    {
      name: "إكسسوارات",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      count: "120+ قطعة"
    },
    {
      name: "أحذية",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      count: "95+ قطعة"
    }
  ]

  const searchItems = [
    ...featuredProducts.map((product) => ({
      type: 'product',
      name: product.name,
      link: '#products',
    })),
    ...categories.map((category) => ({
      type: 'category',
      name: category.name,
      link: '#categories',
    })),
  ]

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
  
  const filteredSearchResults = searchItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const faqs = [
    {
      question: "ما هي سياسة الإرجاع؟",
      answer: "نقدم سياسة إرجاع مرنة خلال 30 يومًا من تاريخ الشراء، بشرط أن تكون المنتجات في حالتها الأصلية مع الملصقات والتغليف الأصلي."
    },
    {
      question: "كيف يمكنني تتبع طلبي؟",
      answer: "بعد تأكيد الطلب، ستتلقى رابط تتبع عبر البريد الإلكتروني يتيح لك مراقبة حالة الشحنة في الوقت الفعلي."
    },
    {
      question: "هل الشحن متاح دوليًا؟",
      answer: "نعم، نقدم الشحن الدولي إلى معظم الدول. يمكنك التحقق من توفر الشحن إلى بلدك أثناء عملية الدفع."
    },
    {
      question: "كيف يمكنني التواصل مع خدمة العملاء؟",
      answer: "يمكنك التواصل معنا عبر البريد الإلكتروني (info@luxefashion.com) أو الهاتف (+966 50 123 4567) خلال ساعات العمل."
    }
  ]

  const values = [
    { title: "الجودة", description: "نلتزم بتقديم منتجات عالية الجودة مصنوعة من أفضل المواد لضمان المتانة والراحة." },
    { title: "الابتكار", description: "نبتكر تصاميم فريدة تجمع بين الأناقة العصرية واللمسة التقليدية لتلبية أذواق عملائنا." },
    { title: "الاستدامة", description: "نعمل على تقليل بصمتنا البيئية من خلال استخدام مواد مستدامة وممارسات إنتاج صديقة للبيئة." },
    { title: "الأناقة", description: "نؤمن بأن الأناقة هي تعبير عن الذات، ونسعى لتقديم قطع تعكس ذوقك الرفيع." }
  ]

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
    toast({
      title: favorites.includes(productId) ? "تمت الإزالة من المفضلة" : "تمت الإضافة إلى المفضلة",
      description: `تم تحديث قائمة المفضلة.`,
    })
  }

  const addToCart = (product, size = null, color = null) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id && item.size === size && item.color === color)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1, size, color }]
    })
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `${product.name} تمت إضافته إلى سلة التسوق.`,
    })
  }

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
    toast({
      title: "تمت الإزالة من السلة",
      description: "تم إزالة المنتج من سلة التسوق.",
    })
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
    toast({
      title: "تم تفريغ السلة",
      description: "تم إزالة جميع المنتجات من سلة التسوق.",
    })
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(' ريال', '').replace(',', ''))
      return total + price * item.quantity
    }, 0).toFixed(2)
  }

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0)

  const viewProductDetails = (product) => {
    setSelectedProduct(product)
    setIsProductDialogOpen(true)
  }

  const viewAllProducts = () => {
    setFilters({ new: false, sale: false })
    setSortOption('default')
    setCurrentPage(1)
  }

  const filteredProducts = featuredProducts.filter((product) => {
    if (!filters.new && !filters.sale) return true
    if (filters.new && filters.sale) return product.isNew && product.isSale
    if (filters.new) return product.isNew
    if (filters.sale) return product.isSale
    return false
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') {
      return parseFloat(a.price.replace(' ريال', '').replace(',', '')) - parseFloat(b.price.replace(' ريال', '').replace(',', ''))
    }
    if (sortOption === 'price-high') {
      return parseFloat(b.price.replace(' ريال', '').replace(',', '')) - parseFloat(a.price.replace(' ريال', '').replace(',', ''))
    }
    if (sortOption === 'rating') {
      return b.rating - a.rating
    }
    return 0
  })

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const [productsPerPage, setProductsPerPage] = useState(3)

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    toast({
      title: "تم تغيير الصفحة",
      description: `أنت الآن في الصفحة ${page}`,
      duration: 2000,
    })
  }, [toast])

  const handleProductsPerPageChange = useCallback((value) => {
    setProductsPerPage(Number(value))
    setCurrentPage(1) // إعادة تعيين الصفحة إلى الأولى عند تغيير عدد المنتجات
  }, [])

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5
    let startPage, endPage

    if (totalPages <= maxPagesToShow) {
      startPage = 1
      endPage = totalPages
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2)
      const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1
        endPage = maxPagesToShow
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1
        endPage = totalPages
      } else {
        startPage = currentPage - maxPagesBeforeCurrent
        endPage = currentPage + maxPagesAfterCurrent
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div className="min-h-screen bg-background luxury-font-body">
      <nav className="luxury-nav sticky top-0 z-50 animate-nav-slide-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl font-bold luxury-font-heading luxury-text-gradient">
                LUXE FASHION
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Menubar className="luxury-menubar bg-transparent border-none">
                <MenubarMenu value="home">
                  <MenubarTrigger className="luxury-menubar-trigger">الرئيسية</MenubarTrigger>
                  <MenubarContent className="luxury-menubar-content">
                    <MenubarItem className="luxury-menubar-item">
                      <a href="#home">الصفحة الرئيسية</a>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu value="shop">
                  <MenubarTrigger className="luxury-menubar-trigger">التسوق</MenubarTrigger>
                  <MenubarContent className="luxury-menubar-content">
                    <MenubarItem className="luxury-menubar-item">
                      <a href="#products">جميع المنتجات</a>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger className="luxury-menubar-item">تصفح حسب الفئة</MenubarSubTrigger>
                      <MenubarSubContent className="luxury-menubar-content">
                        <MenubarItem className="luxury-menubar-item">
                          <a href="#products">ملابس نسائية</a>
                        </MenubarItem>
                        <MenubarItem className="luxury-menubar-item">
                          <a href="#products">ملابس رجالية</a>
                        </MenubarItem>
                        <MenubarItem className="luxury-menubar-item">
                          <a href="#products">إكسسوارات</a>
                        </MenubarItem>
                        <MenubarItem className="luxury-menubar-item">
                          <a href="#products">أحذية</a>
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu value="about">
                  <MenubarTrigger className="luxury-menubar-trigger">من نحن</MenubarTrigger>
                  <MenubarContent className="luxury-menubar-content">
                    <MenubarItem className="luxury-menubar-item">
                      <a href="#about">قصة العلامة التجارية</a>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu value="faq">
                  <MenubarTrigger className="luxury-menubar-trigger">الأسئلة الشائعة</MenubarTrigger>
                  <MenubarContent className="luxury-menubar-content">
                    <MenubarItem className="luxury-menubar-item">
                      <a href="#faq">الأسئلة والإجابات</a>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu value="contact">
                  <MenubarTrigger className="luxury-menubar-trigger">تواصل معنا</MenubarTrigger>
                  <MenubarContent className="luxury-menubar-content">
                    <MenubarItem className="luxury-menubar-item">
                      <a href="#contact">معلومات التواصل</a>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="luxury-btn-icon touch-friendly"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="luxury-btn-icon touch-friendly"
                aria-label="Favorites"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="luxury-shadow cursor-pointer">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="luxury-menubar-content w-48">
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="luxury-menubar-item justify-start">
                      الحساب
                    </Button>
                    <Button variant="ghost" className="luxury-menubar-item justify-start">
                      الإعدادات
                    </Button>
                    <Button variant="ghost" className="luxury-menubar-item justify-start">
                      تسجيل الخروج
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative luxury-btn-icon touch-friendly" aria-label="Cart">
                    <ShoppingBag className="h-5 w-5" />
                    {totalCartItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse-cart">
                        {totalCartItems}
                      </Badge>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="luxury-drawer">
                  <DrawerHeader>
                    <DrawerTitle className="luxury-font-heading text-xl">سلة التسوق</DrawerTitle>
                    <DrawerDescription>إدارة مشترياتك</DrawerDescription>
                  </DrawerHeader>
                  <ScrollArea className="h-[50vh] px-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        سلة التسوق فارغة
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4 border-b pb-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md luxury-shadow"
                            />
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.price}</p>
                              {item.size && <p className="text-sm text-muted-foreground">المقاس: {item.size}</p>}
                              {item.color && <p className="text-sm text-muted-foreground">اللون: {item.color}</p>}
                              <div className="flex items-center space-x-2 mt-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 luxury-btn-icon touch-friendly"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-sm">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 luxury-btn-icon touch-friendly"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="luxury-btn-icon touch-friendly"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  {cart.length > 0 && (
                    <div className="px-4 py-4 border-t">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>الإجمالي:</span>
                        <span>{calculateTotal()} ريال</span>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button
                          className="luxury-btn-outline flex-1 touch-friendly"
                          onClick={clearCart}
                        >
                          تفريغ السلة
                        </Button>
                        <Button
                          className="luxury-btn-gold flex-1 touch-friendly"
                          onClick={() => {
                            toast({
                              title: "جارٍ الدفع",
                              description: "سيتم توجيهك إلى صفحة الدفع.",
                            });
                            setIsCartOpen(false);
                          }}
                        >
                          الدفع الآن
                        </Button>
                      </div>
                    </div>
                  )}
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" className="luxury-btn-outline touch-friendly">
                        إغلاق
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="flex md:hidden items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="luxury-btn-icon touch-friendly"
                aria-label="Search"
              >
                <Search className="h-6 w-6" />
              </Button>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative luxury-btn-icon touch-friendly"
                    aria-label="Cart"
                  >
                    <ShoppingBag className="h-6 w-6" />
                    {totalCartItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse-cart">
                        {totalCartItems}
                      </Badge>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="luxury-drawer">
                  <DrawerHeader>
                    <DrawerTitle className="luxury-font-heading text-xl">سلة التسوق</DrawerTitle>
                    <DrawerDescription>إدارة مشترياتك</DrawerDescription>
                  </DrawerHeader>
                  <ScrollArea className="h-[50vh] px-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        سلة التسوق فارغة
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4 border-b pb-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md luxury-shadow"
                            />
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.price}</p>
                              {item.size && <p className="text-sm text-muted-foreground">المقاس: {item.size}</p>}
                              {item.color && <p className="text-sm text-muted-foreground">اللون: {item.color}</p>}
                              <div className="flex items-center space-x-2 mt-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 luxury-btn-icon touch-friendly"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-sm">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 luxury-btn-icon touch-friendly"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="luxury-btn-icon touch-friendly"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  {cart.length > 0 && (
                    <div className="px-4 py-4 border-t">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>الإجمالي:</span>
                        <span>{calculateTotal()} ريال</span>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button
                          className="luxury-btn-outline flex-1 touch-friendly"
                          onClick={clearCart}
                        >
                          تفريغ السلة
                        </Button>
                        <Button
                          className="luxury-btn-gold flex-1 touch-friendly"
                          onClick={() => {
                            toast({
                              title: "جارٍ الدفع",
                              description: "سيتم توجيهك إلى صفحة الدفع.",
                            });
                            setIsCartOpen(false);
                          }}
                        >
                          الدفع الآن
                        </Button>
                      </div>
                    </div>
                  )}
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" className="luxury-btn-outline touch-friendly">
                        إغلاق
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(true)}
                    className="luxury-btn-icon touch-friendly"
                    aria-label="Menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="luxury-sheet bg-background/95 backdrop-blur-xl">
                  <SheetHeader className="relative">
                    <SheetTitle className="luxury-font-heading text-2xl luxury-text-gradient">
                      القائمة
                    </SheetTitle>
                    <SheetDescription>اختر وجهتك</SheetDescription>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 left-2 luxury-btn-icon touch-friendly"
                        aria-label="Close Menu"
                      >
                        <X className="h-6 w-6 animate-spin-on-hover" />
                      </Button>
                    </SheetClose>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-10rem)] py-4">
                    <div className="px-4 space-y-4">
                      <div className="mb-6">
                        <Input
                          placeholder="ابحث عن منتج أو فئة..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="luxury-input w-full"
                        />
                      </div>
                      <a
                        href="#home"
                        className="block px-4 py-3 luxury-nav-link text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        الرئيسية
                      </a>
                      <a
                        href="#products"
                        className="block px-4 py-3 luxury-nav-link text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        التسوق
                      </a>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="categories">
                          <AccordionTrigger className="px-4 py-3 luxury-nav-link text-lg font-semibold hover:bg-accent/10 rounded-md">
                            الفئات
                          </AccordionTrigger>
                          <AccordionContent className="pl-6 space-y-2">
                            <a
                              href="#products"
                              className="block px-4 py-2 luxury-nav-link text-base hover:bg-accent/10 rounded-md transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              ملابس نسائية
                            </a>
                            <a
                              href="#products"
                              className="block px-4 py-2 luxury-nav-link text-base hover:bg-accent/10 rounded-md transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              ملابس رجالية
                            </a>
                            <a
                              href="#products"
                              className="block px-4 py-2 luxury-nav-link text-base hover:bg-accent/10 rounded-md transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              إكسسوارات
                            </a>
                            <a
                              href="#products"
                              className="block px-4 py-2 luxury-nav-link text-base hover:bg-accent/10 rounded-md transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              أحذية
                            </a>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <a
                        href="#about"
                        className="block px-4 py-3 luxury-nav-link text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        من نحن
                      </a>
                      <a
                        href="#faq"
                        className="block px-4 py-3 luxury-nav-link text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        الأسئلة الشائعة
                      </a>
                      <a
                        href="#contact"
                        className="block px-4 py-3 luxury-nav-link text-lg font-semibold hover:bg-accent/10 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        تواصل معنا
                      </a>
                    </div>
                  </ScrollArea>
                  <SheetFooter className="mt-4">
                    <SheetClose asChild>
                      <Button className="luxury-btn-outline w-full touch-friendly text-lg">
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

      <CommandDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        title="البحث في LUXE FASHION"
        description="ابحث عن المنتجات أو الفئات..."
        className="luxury-command-dialog"
      >
        <CommandInput
          placeholder="ابحث عن منتج أو فئة..."
          className="luxury-command-input"
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
          <CommandGroup heading="المنتجات" className="luxury-command-item">
            {filteredSearchResults
              .filter((item) => item.type === 'product')
              .map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setIsSearchOpen(false)
                    window.location.hash = item.link
                  }}
                  className="luxury-command-item text-lg"
                >
                  {item.name}
                  <CommandShortcut>منتج</CommandShortcut>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="الفئات" className="luxury-command-item">
            {filteredSearchResults
              .filter((item) => item.type === 'category')
              .map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setIsSearchOpen(false)
                    window.location.hash = item.link
                  }}
                  className="luxury-command-item text-lg"
                >
                  {item.name}
                  <CommandShortcut>فئة</CommandShortcut>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <section id="home" className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative h-full flex items-center justify-center text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                  <h1 className="text-5xl md:text-7xl font-bold luxury-font-heading mb-6 fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-4 slide-in-left">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg mb-8 max-w-2xl mx-auto slide-in-right">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-accent' : 'bg-white/50'
              } touch-friendly`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <section id="categories" className="py-20 bg-secondary/20 luxury-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-8 luxury-shadow fade-in">
            <BreadcrumbList className="luxury-font-body text-base md:text-lg">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home" className="luxury-nav-link">
                  الرئيسية
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="luxury-font-body text-muted-foreground">
                  الفئات
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold luxury-font-heading luxury-text-gradient mb-4 slide-in-left">
              تسوق حسب الفئة
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto luxury-font-body fade-in">
              اكتشف مجموعتنا المتنوعة من الملابس والإكسسوارات الفاخرة المصممة لتعكس أناقتك الفريدة
            </p>
          </div>

          <div className="luxury-product-grid">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="luxury-product-card luxury-card luxury-shadow-hover group cursor-pointer overflow-hidden"
              >
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="luxury-product-image"
                  />
                  <div className="luxury-product-overlay">
                    <button className="luxury-btn-gold smooth-transition touch-friendly">
                      استكشف الآن
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white luxury-font-heading">
                    <h3 className="text-xl md:text-2xl font-bold drop-shadow-md">
                      {category.name}
                    </h3>
                    <p className="text-sm md:text-base opacity-90 luxury-font-body">
                      {category.count} منتج
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
                  })
                  setCurrentPage(1)
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
                setSortOption(value)
                setCurrentPage(1)
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
                                        addToCart(product, product.size || product.sizes[0], product.color || product.colors[0])
                                        toast({
                                          title: "تمت الإضافة بسرعة",
                                          description: `${product.name} تمت إضافته إلى السلة.`,
                                        })
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
                                    title: "تمت المشاركة",
                                    description: `تمت مشاركة ${product.name} عبر البريد الإلكتروني.`,
                                  })
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
                                title: "تمت المشاركة",
                                description: `تمت مشاركة ${product.name} عبر البريد الإلكتروني.`,
                              })
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
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
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
                        e.preventDefault()
                        setCurrentPage(page)
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
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
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

      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="luxury-card">
          <DialogHeader>
            <DialogTitle className="luxury-font-heading text-2xl">
              {selectedProduct?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <AspectRatio ratio={4 / 3}>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="object-cover w-full h-full rounded-md"
                />
              </AspectRatio>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-accent">
                    {selectedProduct.price}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {selectedProduct.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(selectedProduct.rating)
                          ? 'text-accent fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground mr-2">
                    ({selectedProduct.reviews})
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <Select
                  onValueChange={(value) => setSelectedProduct({ ...selectedProduct, size: value })}
                >
                  <SelectTrigger className="luxury-input">
                    <SelectValue placeholder="اختر المقاس" />
                  </SelectTrigger>
                  <SelectContent className="luxury-menubar-content">
                    {selectedProduct.sizes.map((size) => (
                      <SelectItem key={size} value={size} className="luxury-menubar-item">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => setSelectedProduct({ ...selectedProduct, color: value })}
                >
                  <SelectTrigger className="luxury-input">
                    <SelectValue placeholder="اختر اللون" />
                  </SelectTrigger>
                  <SelectContent className="luxury-menubar-content">
                    {selectedProduct.colors.map((color) => (
                      <SelectItem key={color} value={color} className="luxury-menubar-item">
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  className="luxury-btn w-full touch-friendly"
                  onClick={() => {
                    addToCart(selectedProduct, selectedProduct.size || selectedProduct.sizes[0], selectedProduct.color || selectedProduct.colors[0])
                    setIsProductDialogOpen(false)
                  }}
                >
                  أضف للسلة
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="luxury-btn-outline touch-friendly">إغلاق</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section id="about" className="py-24 bg-gradient-to-b from-secondary/20 to-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-8 luxury-shadow animate-fade-in">
            <BreadcrumbList className="luxury-font-body text-lg">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home" className="hover:text-accent transition-colors">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-muted-foreground">من نحن</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold luxury-font-heading luxury-text-gradient animate-slide-in-up">
                قصة العلامة التجارية
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                في LUXE FASHION، نؤمن بأن الموضة تعبر عن الشخصية والذوق الرفيع. منذ تأسيسنا، نسعى لتقديم تصاميم عالمية بلمسة عربية أصيلة.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                فريقنا من المصممين والخبراء يعمل بجد لاختيار أفضل القطع وأحدث صيحات الموضة، مقدمًا جودة استثنائية بأسعار تنافسية.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {[
                  { value: "500+", label: "منتج متاح", icon: ShoppingBag },
                  { value: "10K+", label: "عميل راضي", icon: Heart },
                  { value: "5", label: "سنوات خبرة", icon: Star },
                ].map((stat, index) => (
                  <Card key={index} className="luxury-card bg-background/80 backdrop-blur-sm border-accent/20 hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                    <CardContent className="p-6 text-center">
                      <stat.icon className="h-8 w-8 mx-auto mb-4 text-accent" />
                      <div className="text-3xl font-bold luxury-text-gradient">{stat.value}</div>
                      <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold luxury-font-heading luxury-text-gradient mb-6">
                قيمنا
              </h3>
              {values.map((value, index) => (
                <Collapsible key={index} className="luxury-collapsible bg-background/50 border border-accent/10 rounded-lg mb-4 transition-all duration-300 hover:bg-background/80">
                  <CollapsibleTrigger className="luxury-collapsible-trigger flex justify-between items-center p-4 text-lg font-semibold luxury-font-heading hover:text-accent transition-colors">
                    {value.title}
                    <span className="text-accent text-xl">{value.isOpen ? '−' : '+'}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="luxury-collapsible-content p-4 text-muted-foreground text-base">
                    {value.description}
                  </CollapsibleContent>
                </Collapsible>
              ))}
              <p className="text-sm text-muted-foreground italic mt-8 animate-fade-in">
                تم تطوير هذا الموقع بواسطة فريق Ababil المتخصص في التطوير والتصميم
              </p>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="About Us"
                className="w-full h-[32rem] object-cover rounded-xl luxury-shadow group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl group-hover:from-black/50"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6 luxury-shadow">
            <BreadcrumbList className="luxury-font-body">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>الأسئلة الشائعة</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              إجابات على الأسئلة الأكثر شيوعًا حول خدماتنا ومنتجاتنا
            </p>
          </div>
          <Accordion type="single" collapsible className="luxury-card">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="luxury-font-heading text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer id="contact" className="luxury-footer py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold luxury-font-heading mb-6">
                LUXE FASHION
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                وجهتك الأولى للموضة الفاخرة والتصاميم العصرية. 
                نقدم لك أفضل التشكيلات من أرقى العلامات التجارية.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent touch-friendly">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent touch-friendly">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent touch-friendly">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-primary-foreground/80 hover:text-accent transition-colors">الرئيسية</a></li>
                <li><a href="#products" className="text-primary-foreground/80 hover:text-accent transition-colors">المنتجات</a></li>
                <li><a href="#categories" className="text-primary-foreground/80 hover:text-accent transition-colors">الفئات</a></li>
                <li><a href="#events" className="text-primary-foreground/80 hover:text-accent transition-colors">الفعاليات</a></li>
                <li><a href="#sales-stats" className="text-primary-foreground/80 hover:text-accent transition-colors">إحصائيات المبيعات</a></li>
                <li><a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors">من نحن</a></li>
                <li><a href="#faq" className="text-primary-foreground/80 hover:text-accent transition-colors">الأسئلة الشائعة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">خدمة العملاء</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">سياسة الإرجاع</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">الشحن والتوصيل</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">تتبع الطلب</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">تواصل معنا</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 ml-3 text-accent" />
                  <span className="text-primary-foreground/80">+966 50 123 4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 ml-3 text-accent" />
                  <span className="text-primary-foreground/80">info@luxefashion.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 ml-3 text-accent" />
                  <span className="text-primary-foreground/80">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-primary-foreground/60 text-sm">
                © 2024 LUXE FASHION. جميع الحقوق محفوظة.
              </p>
              <p className="text-primary-foreground/60 text-sm mt-4 md:mt-0">
                Developed by Ababil Team
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App