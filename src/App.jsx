import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Search, 
  User, 
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
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

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
      subtitle: "من إبداع فريق Bin Tuhami",
      description: "قطع مميزة ومحدودة الإصدار تعكس ذوقك الرفيع",
      buttonText: "تسوق الحصريات",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ]

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "فستان سهرة أنيق",
      price: "1,299 ريال",
      originalPrice: "1,599 ريال",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
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
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80",
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
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80",
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

  // Auto-slide effect for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

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
                <a href="#about" className="luxury-nav-link">من نحن</a>
                <a href="#contact" className="luxury-nav-link">تواصل معنا</a>
              </div>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <a href="#home" className="block px-3 py-2 luxury-nav-link">الرئيسية</a>
              <a href="#products" className="block px-3 py-2 luxury-nav-link">المنتجات</a>
              <a href="#categories" className="block px-3 py-2 luxury-nav-link">الفئات</a>
              <a href="#about" className="block px-3 py-2 luxury-nav-link">من نحن</a>
              <a href="#contact" className="block px-3 py-2 luxury-nav-link">تواصل معنا</a>
            </div>
          </div>
        )}
      </nav>

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

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading mb-4">
              المنتجات المميزة
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              تشكيلة مختارة بعناية من أفضل القطع في مجموعتنا
            </p>
          </div>

          <div className="luxury-product-grid">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="luxury-product-card luxury-card overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="luxury-product-image"
                  />
                  <div className="luxury-product-overlay">
                    <Button className="luxury-btn-gold">
                      عرض التفاصيل
                    </Button>
                  </div>
                  {product.isNew && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      جديد
                    </Badge>
                  )}
                  {product.isSale && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-white">
                      تخفيض
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
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
            ))}
          </div>

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
              <p className="text-sm text-muted-foreground italic">
                تم تطوير هذا الموقع بواسطة فريق Bin Tuhami المتخصص في التطوير والتصميم
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

      {/* Newsletter Section */}
      <section className="py-20 luxury-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold luxury-font-heading mb-6 text-white">
            اشترك في النشرة الإخبارية
          </h2>
          <p className="text-xl text-white/90 mb-8">
            كن أول من يعلم بأحدث المنتجات والعروض الحصرية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-6 py-4 rounded-lg border-0 focus:ring-2 focus:ring-white/50 text-right"
            />
            <Button className="bg-white text-accent hover:bg-white/90 px-8 py-4">
              اشترك الآن
            </Button>
          </div>
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
                <li><a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors">من نحن</a></li>
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
                تم التطوير بواسطة فريق Bin Tuhami
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

