import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion.jsx';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb.jsx';

function FAQSection({ faqs }) {
  return (
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
  );
}

export default FAQSection;