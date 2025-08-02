import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

function Footer() {
  return (
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
  );
}

export default Footer;