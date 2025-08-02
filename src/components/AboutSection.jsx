import React from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb.jsx';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible.jsx';
import { ShoppingBag, Heart, Star } from 'lucide-react';

function AboutSection({ values }) {
  return (
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
                { value: '500+', label: 'منتج متاح', icon: ShoppingBag },
                { value: '10K+', label: 'عميل راضي', icon: Heart },
                { value: '5', label: 'سنوات خبرة', icon: Star },
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
  );
}

export default AboutSection;