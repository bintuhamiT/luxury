import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
  MapPin
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
import { Calendar } from '@/components/ui/calendar.jsx'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel.jsx'
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
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
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form.jsx'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card.jsx'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '@/components/ui/input-otp.jsx'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState({
    name: "أحمد",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  })
  const [selectedDate, setSelectedDate] = useState(null)
  const [filters, setFilters] = useState({
    new: false,
    sale: false,
  })
  const [events] = useState([
    {
      date: new Date(2025, 6, 25), // 25 يوليو 2025
      title: "إطلاق مجموعة الصيف",
      description: "اكتشف تشكيلتنا الصيفية الجديدة مع تصاميم حصرية."
    },
    {
      date: new Date(2025, 7, 1), // 1 أغسطس 2025
      title: "تخفيضات نهاية الموسم",
      description: "استمتع بخصومات تصل إلى 50% على المنتجات المختارة."
    }
  ])
  const [otpStep, setOtpStep] = useState(false) // State to toggle between email confirmation and OTP input
  const [otp, setOtp] = useState('') // State to store OTP value
  const [otpError, setOtpError] = useState('') // State to store OTP error message

  // Initialize form with react-hook-form
  const form = useForm({
    defaultValues: {
      email: ""
    },
    mode: "onSubmit"
  })

  // Hero slides data
  const heroSlides = [
    {
      title: "مجموعة الخريف الجديدة",
      subtitle: "اكتشف أحدث صيحات الموضة",
      description: "تشكيلة فاخرة من الملابس العصرية المصممة خصيصاً لك",
      buttonText: "تسوق الآن",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "الأناقة الكلاسيكية",
      subtitle: "طابع خالد وعصري",
      description: "قطع أساسية تجمع بين الراحة والأناقة لإطلالة مثالية",
      buttonText: "اكتشف المزيد",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      title: "تصاميم حصرية",
      subtitle: "من إبداع فريق Ababil",
      description: "قطع مميزة ومحدودة الإصدار تعكس ذوقك الرفيع",
      buttonText: "تسوق الحصريات",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ]

  // Featured products data with descriptions
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
      isSale: true
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
      isSale: false
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
      isSale: true
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
      isSale: false
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
      isSale: true
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
      isSale: false
    }
  ]

  // Categories data
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

  // Combine products and categories for search
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

  // Filter search results based on query
  const filteredSearchResults = searchItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // FAQ data
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

  // Sales statistics data
  const salesData = [
    { month: "يناير", women: 1200, men: 900, accessories: 600, shoes: 400 },
    { month: "فبراير", women: 1500, men: 1100, accessories: 800, shoes: 500 },
    { month: "مارس", women: 1800, men: 1300, accessories: 900, shoes: 600 },
    { month: "أبريل", women: 2000, men: 1500, accessories: 1000, shoes: 700 },
    { month: "مايو", women: 2200, men: 1700, accessories: 1200, shoes: 800 },
    { month: "يونيو", women: 2500, men: 1900, accessories: 1400, shoes: 900 },
  ]

  const chartConfig = {
    women: { label: "ملابس نسائية", color: "#FFD700" }, // ذهبي
    men: { label: "ملابس رجالية", color: "#C0C0C0" }, // فضي
    accessories: { label: "إكسسوارات", color: "#4682B4" }, // أزرق
    shoes: { label: "أحذية", color: "#800000" }, // بورجوندي
  }

  // Our values data
  const values = [
    {
      title: "الجودة",
      description: "نلتزم بتقديم منتجات عالية الجودة مصنوعة من أفضل المواد لضمان المتانة والراحة."
    },
    {
      title: "الابتكار",
      description: "نبتكر تصاميم فريدة تجمع بين الأناقة العصرية واللمسة التقليدية لتلبية أذواق عملائنا."
    },
    {
      title: "الاستدامة",
      description: "نعمل على تقليل بصمتنا البيئية من خلال استخدام مواد مستدامة وممارسات إنتاج صديقة للبيئة."
    },
    {
      title: "الأناقة",
      description: "نؤمن بأن الأناقة هي تعبير عن الذات، ونسعى لتقديم قطع تعكس ذوقك الرفيع."
    }
  ]

  // Handle filter changes
  const handleFilterChange = (filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }))
  }

  // Handle adding/removing from favorites
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  // Handle form submission
  const onSubmit = (data) => {
    setIsDialogOpen(true) // Open dialog on successful form submission
  }

  // Handle OTP submission
  const handleOTPSubmit = () => {
    if (otp === '123456') { // Simulated correct OTP for demo
      setIsSubscribed(true)
      setIsDialogOpen(false)
      setOtpStep(false)
      setOtp('')
      setOtpError('')
      form.reset()
    } else {
      setOtpError('رمز OTP غير صحيح. حاول مرة أخرى.')
    }
  }

  // Auto-slide effect for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  // Calendar modifiers for event dates
  const eventDates = events.map(event => event.date)
  const modifiers = {
    event: eventDates,
  }
  const modifiersClassNames = {
    event: 'luxury-event-date',
  }

  // Filter products based on selected filters
  const filteredProducts = featuredProducts.filter((product) => {
    if (!filters.new && !filters.sale) return true; // Show all if no filters selected
    if (filters.new && filters.sale) return product.isNew && product.isSale;
    if (filters.new) return product.isNew;
    if (filters.sale) return product.isSale;
    return false;
  })

  return (
    <div className="min-h-screen bg-background luxury-font-body">
      {/* Navigation */}
      <nav className="luxury-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold luxury-font-heading luxury-text-gradient">
                LUXE FASHION
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="luxury-nav-link">الرئيسية</a>
                <a href="#products" className="luxury-nav-link">المنتجات</a>
                <a href="#categories" className="luxury-nav-link">الفئات</a>
                <a href="#events" className="luxury-nav-link">الفعاليات</a>
                <a href="#sales-stats" className="luxury-nav-link">إحصائيات المبيعات</a>
                <a href="#about" className="luxury-nav-link">من نحن</a>
                <a href="#faq" className="luxury-nav-link">الأسئلة الشائعة</a>
                <a href="#contact" className="luxury-nav-link">تواصل معنا</a>
              </div>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Avatar className="luxury-shadow">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="luxury-drawer" data-vaul-drawer-direction="right">
                  <DrawerHeader>
                    <DrawerTitle className="luxury-font-heading text-xl">
                      القائمة
                    </DrawerTitle>
                    <DrawerDescription>اختر وجهتك</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 py-2 space-y-3">
                    <a
                      href="#home"
                      className="block px-3 py-2 luxury-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      الرئيسية
                    </a>
                    <a
                      href="#products"
                      className="block px-3 py-2 luxury-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      المنتجات
                    </a>
                    <a
                      href="#categories"
                      className="block px-3 py-2 luxury-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      الفئات
                    </a>
                    <a
                      href="#events"
                      className="block px-3 py-2 luxury-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      الفعاليات
                    </a>
                    <a
                      href="#sales-stats"
                      className="block px-3 py-2 luxury-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      إحصائيات المبيعات
                    </a>
                    <a
                      href="#about"
                      className="block px-3 py-2 luxury-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      من نحن
                    </a>
                    <a
                      href="#faq"
                      className="block px-3 py-2 luxury-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      الأسئلة الشائعة
                    </a>
                    <a
                      href="#contact"
                      className="block px-3 py-2 luxury-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      تواصل معنا
                    </a>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button className="luxury-btn-outline">إغلاق</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Command Dialog */}
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
                  className="luxury-command-item"
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
                  className="luxury-command-item"
                >
                  {item.name}
                  <CommandShortcut>فئة</CommandShortcut>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Hero Section */}
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
                  <Button className="luxury-btn-gold text-lg px-12 py-6">
                    {slide.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-accent' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6 luxury-shadow">
            <BreadcrumbList className="luxury-font-body">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>الفعاليات</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading mb-4">
              الفعاليات القادمة
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              تابع مواعيد إصداراتنا الجديدة والعروض الخاصة
            </p>
          </div>
          <Card className="luxury-card luxury-shadow">
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                className="luxury-shadow"
                onDayClick={(date) => {
                  const event = events.find(
                    (e) => e.date.toDateString() === date.toDateString()
                  )
                  setSelectedDate(date)
                }}
              />
              {selectedDate && (
                <div className="mt-6">
                  {events.find(
                    (e) => e.date.toDateString() === selectedDate.toDateString()
                  ) ? (
                    <div>
                      <h3 className="text-lg font-semibold luxury-font-heading mb-2">
                        {
                          events.find(
                            (e) => e.date.toDateString() === selectedDate.toDateString()
                          ).title
                        }
                      </h3>
                      <p className="text-muted-foreground">
                        {
                          events.find(
                            (e) => e.date.toDateString() === selectedDate.toDateString()
                          ).description
                        }
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      لا توجد فعاليات في هذا التاريخ.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sales Statistics Section */}
      <section id="sales-stats" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6 luxury-shadow">
            <BreadcrumbList className="luxury-font-body">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>إحصائيات المبيعات</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading mb-4">
              إحصائيات المبيعات
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              تابع أداء مبيعاتنا عبر الفئات المختلفة خلال الأشهر الماضية
            </p>
          </div>
          <Card className="luxury-card luxury-shadow">
            <CardContent className="p-6">
              <ChartContainer config={chartConfig} className="luxury-chart">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="women" fill="var(--color-women)" />
                  <Bar dataKey="men" fill="var(--color-men)" />
                  <Bar dataKey="accessories" fill="var(--color-accessories)" />
                  <Bar dataKey="shoes" fill="var(--color-shoes)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6 luxury-shadow">
            <BreadcrumbList className="luxury-font-body">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>الفئات</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading mb-4">
              تسوق حسب الفئة
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اكتشف مجموعتنا المتنوعة من الملابس والإكسسوارات الفاخرة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="luxury-card group cursor-pointer overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold luxury-font-heading">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6 luxury-shadow">
            <BreadcrumbList className="luxury-font-body">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>المنتجات</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading mb-4">
              المنتجات المميزة
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              تشكيلة مختارة بعناية من أفضل القطع في مجموعتنا
            </p>
          </div>

          {/* Filters */}
          <div className="luxury-checkbox-container">
            <div className="luxury-checkbox">
              <Checkbox
                id="new"
                checked={filters.new}
                onCheckedChange={() => handleFilterChange('new')}
              />
              <label htmlFor="new">جديد</label>
            </div>
            <div className="luxury-checkbox">
              <Checkbox
                id="sale"
                checked={filters.sale}
                onCheckedChange={() => handleFilterChange('sale')}
              />
              <label htmlFor="sale">تخفيض</label>
            </div>
          </div>

          <Carousel className="luxury-carousel">
            <CarouselContent>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <CarouselItem key={product.id} className="luxury-carousel-item">
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <Card className="luxury-product-card luxury-card overflow-hidden">
                          <div className="relative">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <AspectRatio ratio={4 / 3}>
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="luxury-product-image object-cover w-full h-full"
                                  />
                                </AspectRatio>
                              </HoverCardTrigger>
                              <HoverCardContent className="luxury-hover-card">
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
                              </HoverCardContent>
                            </HoverCard>
                            <div className="luxury-product-overlay">
                              <Button className="luxury-btn-gold">
                                عرض التفاصيل
                              </Button>
                            </div>
                            {product.isNew && (
                              <a href="#products">
                                <Badge
                                  variant="secondary"
                                  className="absolute top-4 left-4 luxury-shadow"
                                >
                                  جديد
                                </Badge>
                              </a>
                            )}
                            {product.isSale && (
                              <a href="#products">
                                <Badge
                                  variant="destructive"
                                  className="absolute top-4 right-4 luxury-shadow"
                                >
                                  تخفيض
                                </Badge>
                              </a>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
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
                              <Button size="sm" className="luxury-btn">
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
                          onSelect={() => alert(`تمت مشاركة ${product.name}`)}
                        >
                          مشاركة المنتج
                          <ContextMenuShortcut>مشاركة</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem
                          className="luxury-context-menu-item"
                          onSelect={() => (window.location.hash = '#products')}
                        >
                          عرض التفاصيل
                          <ContextMenuShortcut>عرض</ContextMenuShortcut>
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </CarouselItem>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  لا توجد منتجات تطابق الفلاتر المحددة.
                </div>
              )}
            </CarouselContent>
            <CarouselPrevious className="luxury-btn-outline" />
            <CarouselNext className="luxury-btn-outline" />
          </Carousel>

          <div className="text-center mt-12">
            <Button className="luxury-btn-outline text-lg px-12 py-6">
              عرض جميع المنتجات
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6 luxury-shadow">
            <BreadcrumbList className="luxury-font-body">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>من نحن</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading mb-6">
                قصة العلامة التجارية
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                نحن في LUXE FASHION نؤمن بأن الموضة هي تعبير عن الشخصية والذوق الرفيع. 
                منذ تأسيسنا، نسعى لتقديم أفضل التصاميم العالمية مع لمسة عربية أصيلة.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                فريقنا المتخصص من المصممين والخبراء يعمل بلا كلل لانتقاء أفضل القطع 
                وأحدث صيحات الموضة لنقدمها لك بجودة استثنائية وأسعار منافسة.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold luxury-text-gradient">500+</div>
                  <div className="text-sm text-muted-foreground">منتج متاح</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold luxury-text-gradient">10K+</div>
                  <div className="text-sm text-muted-foreground">عميل راضي</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold luxury-text-gradient">5</div>
                  <div className="text-sm text-muted-foreground">سنوات خبرة</div>
                </div>
              </div>
              {/* Our Values */}
              <h3 className="text-2xl font-bold luxury-font-heading mb-6">
                قيمنا
              </h3>
              {values.map((value, index) => (
                <Collapsible key={index} className="luxury-collapsible">
                  <CollapsibleTrigger className="luxury-collapsible-trigger">
                    {value.title}
                    <span>{value.isOpen ? '−' : '+'}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="luxury-collapsible-content">
                    {value.description}
                  </CollapsibleContent>
                </Collapsible>
              ))}
              <p className="text-sm text-muted-foreground italic mt-8">
                تم تطوير هذا الموقع بواسطة فريق Ababil المتخصص في التطوير والتصميم
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="About Us"
                className="w-full h-96 object-cover rounded-lg luxury-shadow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Newsletter Section */}
      <section className="py-20 luxury-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading mb-6 text-white">
            اشترك في النشرة الإخبارية
          </h2>
          <p className="text-xl text-white/90 mb-8">
            كن أول من يعلم بأحدث المنتجات والعروض الحصرية
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "يرجى إدخال بريد إلكتروني صالح"
                  }
                }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="أدخل بريدك الإلكتروني"
                        className="luxury-form-input"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      أدخل بريدك الإلكتروني لتلقي العروض الحصرية
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open)
                if (!open) {
                  setOtpStep(false)
                  setOtp('')
                  setOtpError('')
                }
              }}>
                <DialogTrigger asChild>
                  <Button
                    type="submit"
                    className="bg-white text-accent hover:bg-white/90 px-8 py-4"
                  >
                    اشترك الآن
                  </Button>
                </DialogTrigger>
                <DialogContent className="luxury-dialog">
                  <DialogHeader>
                    <DialogTitle className="luxury-font-heading text-xl">
                      {otpStep ? 'التحقق من OTP' : 'تأكيد الاشتراك'}
                    </DialogTitle>
                    <DialogDescription>
                      {otpStep
                        ? 'أدخل رمز OTP المكون من 6 أرقام المرسل إلى بريدك الإلكتروني.'
                        : 'هل أنت متأكد أنك تريد الاشتراك في النشرة الإخبارية؟ ستتلقى آخر التحديثات والعروض الحصرية مباشرة إلى بريدك الإلكتروني.'}
                    </DialogDescription>
                  </DialogHeader>
                  {otpStep && (
                    <div className="mt-4">
                      <FormItem>
                        <FormLabel>رمز OTP</FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                            className="luxury-otp-container"
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        {otpError && <FormMessage>{otpError}</FormMessage>}
                        <FormDescription>
                          أدخل رمز OTP المرسل إلى بريدك الإلكتروني
                        </FormDescription>
                      </FormItem>
                    </div>
                  )}
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="luxury-btn-outline">
                        إلغاء
                      </Button>
                    </DialogClose>
                    <Button 
                      className="luxury-btn-gold" 
                      onClick={() => {
                        if (otpStep) {
                          handleOTPSubmit()
                        } else {
                          setOtpStep(true)
                        }
                      }}
                    >
                      {otpStep ? 'تأكيد OTP' : 'تأكيد'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </form>
          </Form>
          {isSubscribed && (
            <Alert className="luxury-card mt-6 max-w-md mx-auto" variant="default">
              <AlertTitle className="luxury-font-heading">
                تم الاشتراك بنجاح!
              </AlertTitle>
              <AlertDescription>
                شكرًا لاشتراكك في نشرتنا الإخبارية. ستصلك أحدث العروض والتحديثات قريبًا.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="luxury-footer py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold luxury-font-heading mb-6">
                LUXE FASHION
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                وجهتك الأولى للموضة الفاخرة والتصاميم العصرية. 
                نقدم لك أفضل التشكيلات من أرقى العلامات التجارية.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
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

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-6">خدمة العملاء</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">سياسة الإرجاع</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">الشحن والتوصيل</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">تتبع الطلب</a></li>
              </ul>
            </div>

            {/* Contact Info */}
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
                تم التطوير بواسطة فريق Ababil
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App