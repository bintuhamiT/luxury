import React from 'react';
import { Card } from '@/components/ui/card.jsx';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb.jsx';

function CategoriesSection({ categories }) {
  return (
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
  );
}

export default CategoriesSection;