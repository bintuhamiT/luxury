import React, { useState } from 'react'
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
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form.jsx'
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
import { Progress } from '@/components/ui/progress.jsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet.jsx'

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
    image: "/favicon.ico"
  })
  const [filters, setFilters] = useState({
    new: false,
    sale: false,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 3

  const [otpStep, setOtpStep] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')

  const form = useForm({
    defaultValues: {
      email: ""
    },
    mode: "onSubmit"
  })

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

  const handleFilterChange = (filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const onSubmit = (data) => {
    setIsDialogOpen(true)
  }

  const handleOTPSubmit = () => {
    if (otp === '123456') {
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

  const filteredProducts = featuredProducts.filter((product) => {
    if (!filters.new && !filters.sale) return true
    if (filters.new && filters.sale) return product.isNew && product.isSale
    if (filters.new) return product.isNew
    if (filters.sale) return product.isSale
    return false
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Generate page numbers to display
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
      <nav className="luxury-nav bg-background/95 backdrop-blur-md sticky top-0 z-50 luxury-shadow luxury-border-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#home" className="flex items-center space-x-2">
                <h1 className="text-3xl md:text-4xl font-bold luxury-font-heading luxury-text-gradient fade-in">
                  LUXE FASHION
                </h1>
                <span className="text-accent text-sm luxury-font-body opacity-80">حصري</span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <Menubar className="luxury-menubar bg-transparent border-none">
                {[
                  { value: "home", label: "الرئيسية", href: "#home" },
                  {
                    value: "products",
                    label: "المنتجات",
                    href: "#products",
                    subMenu: [
                      { label: "جميع المنتجات", href: "#products" },
                      { label: "ملابس نسائية", href: "#products" },
                      { label: "ملابس رجالية", href: "#products" },
                      { label: "إكسسوارات", href: "#products" },
                      { label: "أحذية", href: "#products" },
                    ],
                  },
                  {
                    value: "categories",
                    label: "الفئات",
                    href: "#categories",
                    subMenu: [
                      { label: "جميع الفئات", href: "#categories" },
                      { label: "ملابس نسائية", href: "#categories" },
                      { label: "ملابس رجالية", href: "#categories" },
                      { label: "إكسسوارات", href: "#categories" },
                      { label: "أحذية", href: "#categories" },
                    ],
                  },
                  { value: "about", label: "من نحن", href: "#about" },
                  { value: "faq", label: "الأسئلة الشائعة", href: "#faq" },
                  { value: "contact", label: "تواصل معنا", href: "#contact" },
                ].map((item) => (
                  <MenubarMenu key={item.value} value={item.value}>
                    <MenubarTrigger className="luxury-nav-link luxury-font-body text-base px-4 py-2 rounded-full hover:bg-accent/10 hover:text-accent smooth-transition">
                      {item.label}
                    </MenubarTrigger>
                    <MenubarContent className="luxury-context-menu bg-background/95 backdrop-blur-sm luxury-shadow luxury-border-gold rounded-xl mt-2">
                      <MenubarItem className="luxury-context-menu-item luxury-font-body" asChild>
                        <a href={item.href} className="w-full">
                          {item.label === "المنتجات" || item.label === "الفئات" ? `جميع ${item.label}` : item.label}
                        </a>
                      </MenubarItem>
                      {item.subMenu && (
                        <>
                          <MenubarSeparator className="bg-border/50" />
                          <MenubarSub>
                            <MenubarSubTrigger className="luxury-context-menu-item luxury-font-body">
                              تصفح حسب الفئة
                            </MenubarSubTrigger>
                            <MenubarSubContent className="luxury-context-menu bg-background/95 backdrop-blur-sm luxury-shadow luxury-border-gold rounded-xl">
                              {item.subMenu.slice(1).map((subItem, index) => (
                                <MenubarItem key={index} className="luxury-context-menu-item luxury-font-body" asChild>
                                  <a href={subItem.href} className="w-full">
                                    {subItem.label}
                                  </a>
                                </MenubarItem>
                              ))}
                            </MenubarSubContent>
                          </MenubarSub>
                        </>
                      )}
                    </MenubarContent>
                  </MenubarMenu>
                ))}
              </Menubar>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="luxury-shadow rounded-full hover:bg-accent/20 hover:text-accent smooth-transition"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="luxury-shadow rounded-full hover:bg-accent/20 hover:text-accent smooth-transition"
              >
                <Heart className="h-6 w-6" />
              </Button>
              <Avatar className="luxury-shadow luxury-border-gold">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="luxury-font-body text-accent">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                className="luxury-shadow rounded-full hover:bg-accent/20 hover:text-accent smooth-transition"
              >
                <ShoppingBag className="h-6 w-6" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="luxury-shadow rounded-full hover:bg-accent/20 hover:text-accent smooth-transition"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <Menu className="h-7 w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="luxury-drawer bg-background/95 backdrop-blur-sm luxury-shadow luxury-border-gold rounded-l-xl w-[280px] sm:w-[320px]">
                  <SheetHeader>
                    <SheetTitle className="luxury-font-heading text-2xl luxury-text-gradient">
                      القائمة الحصرية
                    </SheetTitle>
                    <SheetDescription className="luxury-font-body text-muted-foreground">
                      استكشف عالم الأناقة
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-12rem)] py-4">
                    <div className="space-y-4 px-4">
                      {[
                        { label: "الرئيسية", href: "#home" },
                        { label: "المنتجات", href: "#products" },
                        { label: "الفئات", href: "#categories" },
                        { label: "من نحن", href: "#about" },
                        { label: "الأسئلة الشائعة", href: "#faq" },
                        { label: "تواصل معنا", href: "#contact" },
                        { label: "عضوية حصرية", href: "#membership" },
                      ].map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="block px-4 py-3 luxury-nav-link luxury-font-body text-lg hover:bg-accent/10 hover:text-accent rounded-lg smooth-transition slide-in-right"
                          style={{ animationDelay: `${index * 0.1}s` }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </ScrollArea>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button className="luxury-btn-gold w-full rounded-full text-lg">
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
        className="lux sixy-command-dialog"
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
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <section id="categories" className="py-24 bg-gradient-to-b from-background to-secondary/10 luxury-hero relative overflow-hidden">
        {/* خلفية زخرفية ديناميكية */}
        <div className="absolute inset-0 bg-[url('/luxury-pattern.png')] opacity-5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-10 luxury-shadow luxury-border-gold rounded-md bg-background/80 backdrop-blur-sm fade-in">
            <BreadcrumbList className="luxury-font-body text-sm md:text-base text-foreground/80">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home" className="luxury-nav-link hover:text-accent">
                  الرئيسية
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-accent mx-2" />
              <BreadcrumbItem>
                <BreadcrumbPage className="luxury-font-body text-accent">
                  الفئات الحصرية
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Heading Section */}
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold luxury-font-heading luxury-text-gradient mb-6 slide-in-left">
              اكتشف فئاتنا الفاخرة
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto luxury-font-body fade-in">
              تجربة تسوق استثنائية مع مجموعاتنا الحصرية من الملابس والإكسسوارات المصممة للأناقة اللافتة
            </p>
          </div>

          {/* Categories Grid */}
          <div className="luxury-product-grid gap-6 md:gap-8">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="luxury-product-card luxury-card luxury-shadow-hover group cursor-pointer overflow-hidden rounded-xl bg-card/95 backdrop-blur-sm border-none slide-in-right"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
                  {/* الصورة */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="luxury-product-image group-hover:scale-110 group-hover:brightness-90"
                  />
                  {/* طبقة التغطية */}
                  <div className="luxury-product-overlay bg-gradient-to-t from-black/60 to-transparent group-hover:bg-black/50">
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition">
                      <button className="luxury-btn-gold luxury-shadow text-sm md:text-base px-6 py-3 rounded-full smooth-transition group-hover:scale-105">
                        تسوق الآن
                      </button>
                      <p className="text-white text-sm luxury-font-body mt-2 opacity-80">
                        مجموعة حصرية
                      </p>
                    </div>
                  </div>
                  {/* نص الفئة */}
                  <div className="absolute bottom-8 left-8 right-8 text-white luxury-font-heading">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-sm md:text-base opacity-85 luxury-font-body">
                      {category.count} قطعة متميزة
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* زر دعوة للعمل مركزي */}
          <div className="text-center mt-16 fade-in">
            <a
              href="#shop"
              className="luxury-btn-outline px-8 py-4 text-lg luxury-font-body rounded-full luxury-shadow-hover"
            >
              استكشف المجموعة الكاملة
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8 luxury-shadow luxury-border rounded-md bg-card/95">
            <BreadcrumbList className="luxury-font-body text-base">
              <BreadcrumbItem>
                <BreadcrumbLink href="#home" className="luxury-nav-link hover:text-accent">
                  الرئيسية
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground mx-2" />
              <BreadcrumbItem>
                <BreadcrumbPage className="luxury-font-body text-foreground">
                  المنتجات
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Heading Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold luxury-font-heading mb-4 text-foreground">
              منتجاتنا المميزة
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto luxury-font-body">
              تشكيلة مختارة بعناية من أجود القطع لتلبية احتياجاتك بأناقة
            </p>
          </div>

          {/* Filters */}
          <div className="luxury-checkbox-container mb-12 justify-start md:justify-center">
            <RadioGroup
              defaultValue="all"
              onValueChange={(value) => {
                setFilters({
                  new: value === 'new',
                  sale: value === 'sale',
                });
                setCurrentPage(1);
              }}
              className="flex flex-wrap gap-6"
            >
              {[
                { value: 'all', label: 'الكل' },
                { value: 'new', label: 'جديد' },
                { value: 'sale', label: 'تخفيض' },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 luxury-checkbox">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="border-border text-accent focus:ring-accent"
                  />
                  <Label
                    htmlFor={option.value}
                    className="luxury-font-body text-base cursor-pointer text-foreground hover:text-accent smooth-transition"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Products Grid */}
          <div className="luxury-product-grid gap-8">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ContextMenu key={product.id}>
                  <ContextMenuTrigger>
                    <Card className="luxury-product-card luxury-card border-border rounded-lg overflow-hidden">
                      <div className="relative h-64 sm:h-72 md:h-80">
                        {/* الصورة */}
                        <AspectRatio ratio={4 / 3}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="luxury-product-image"
                          />
                        </AspectRatio>
                        {/* طبقة التغطية */}
                        <div className="luxury-product-overlay bg-black/20 opacity-0 group-hover:opacity-100 smooth-transition">
                          <Button className="luxury-btn-outline text-sm px-6 py-2 absolute inset-x-0 bottom-4 mx-auto rounded-full">
                            عرض التفاصيل
                          </Button>
                        </div>
                        {/* الشارات */}
                        {product.isNew && (
                          <Badge
                            variant="secondary"
                            className="absolute top-4 left-4 luxury-shadow bg-background text-foreground"
                          >
                            جديد
                          </Badge>
                        )}
                        {product.isSale && (
                          <Badge
                            variant="destructive"
                            className="absolute top-4 right-4 luxury-shadow bg-destructive text-destructive-foreground"
                          >
                            تخفيض {product.discount}%
                          </Badge>
                        )}
                        {/* زر المفضلة */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-4 right-4 bg-background/80 hover:bg-background rounded-full"
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Heart
                            className={`h-5 w-5 smooth-transition ${
                              favorites.includes(product.id)
                                ? 'fill-current text-accent'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </Button>
                      </div>
                      {/* محتوى البطاقة */}
                      <CardContent className="p-6">
                        <h3 className="text-lg md:text-xl font-semibold luxury-font-heading mb-2 text-foreground">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 luxury-font-body line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center mb-3">
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
                            <span className="text-xl md:text-2xl font-bold text-foreground">
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
                            className="luxury-btn-outline text-sm px-4 py-2 rounded-full"
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
                      onSelect={() => alert(`تمت مشاركة ${product.name}`)}
                    >
                      مشاركة المنتج
                      <ContextMenuShortcut>مشاركة</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem
                      className="luxury-context-menu-item"
                      onSelect={() => (window.location.hash = '#product-details')}
                    >
                      عرض التفاصيل
                      <ContextMenuShortcut>عرض</ContextMenuShortcut>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-12 luxury-font-body text-lg">
                لا توجد منتجات تطابق الفلاتر المحددة. جرب تعديل اختياراتك.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-12 luxury-shadow">
              <PaginationContent className="flex-wrap justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={`luxury-btn-outline px-4 py-2 rounded-md smooth-transition ${
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }`}
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
                      className={`luxury-btn-outline px-4 py-2 rounded-md smooth-transition ${
                        currentPage === page ? 'bg-primary text-primary-foreground' : ''
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis className="text-muted-foreground" />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={`luxury-btn-outline px-4 py-2 rounded-md smooth-transition ${
                      currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          {/* زر دعوة للعمل المركزي */}
          <div className="text-center mt-12">
            <Button
              className="luxury-btn-outline text-base px-8 py-4 rounded-md smooth-transition"
            >
              عرض جميع المنتجات
            </Button>
          </div>
        </div>
      </section>

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