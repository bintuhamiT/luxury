import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function CartDrawer({ cart, updateCartQuantity, removeFromCart, clearCart, calculateTotal, isCartOpen, setIsCartOpen }) {
  const { toast } = useToast();

  return (
    <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
      <DrawerContent className="luxury-drawer bg-background/90 backdrop-blur-md max-w-sm sm:max-w-md lg:max-w-lg mx-auto rounded-t-lg">
        <DrawerHeader className="relative pb-3 sm:pb-4">
          <DrawerTitle className="luxury-font-heading text-xl sm:text-2xl md:text-3xl luxury-text-gradient animate-slide-in-up">
            سلة التسوق
          </DrawerTitle>
          <DrawerDescription className="text-sm sm:text-base text-muted-foreground luxury-font-body animate-fade-in-up">
            إدارة مشترياتك
          </DrawerDescription>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 luxury-btn-icon touch-friendly hover:bg-accent/20 smooth-transition"
              aria-label="إغلاق السلة"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 animate-spin-on-hover text-accent" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <ScrollArea className="h-[40vh] sm:h-[50vh] px-3 sm:px-4">
          {cart.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-muted-foreground luxury-font-body animate-fade-in-up">
              سلة التسوق فارغة
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center justify-between border-b border-accent/20 pb-3 sm:pb-4 luxury-shadow-hover bg-background/50 backdrop-blur-sm rounded-md animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md luxury-shadow"
                    />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold luxury-font-heading">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground luxury-font-body">
                        {item.size && `المقاس: ${item.size}`}
                        {item.size && item.color && ' | '}
                        {item.color && `اللون: ${item.color}`}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-accent">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="luxury-btn-icon touch-friendly h-8 w-8 sm:h-9 sm:w-9"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      aria-label="تقليل الكمية"
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <span className="text-xs sm:text-sm font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="luxury-btn-icon touch-friendly h-8 w-8 sm:h-9 sm:w-9"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      aria-label="زيادة الكمية"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="luxury-btn-icon touch-friendly h-8 w-8 sm:h-9 sm:w-9 text-destructive"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="إزالة من السلة"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {cart.length > 0 && (
          <div className="px-3 sm:px-4 py-4 sm:py-6 border-t border-accent/20">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-base sm:text-lg font-semibold luxury-font-heading">الإجمالي:</span>
              <span className="text-base sm:text-lg font-bold text-accent">{calculateTotal()} ريال</span>
            </div>
            <Button
              className="luxury-btn-outline w-full touch-friendly mb-3 sm:mb-4 text-sm sm:text-base"
              onClick={clearCart}
            >
              تفريغ السلة
            </Button>
            <Button
              className="luxury-btn-gold w-full touch-friendly text-sm sm:text-base"
              onClick={() => {
                toast({
                  title: 'إتمام الشراء',
                  description: 'سيتم توجيهك إلى صفحة الدفع.',
                });
                setIsCartOpen(false);
              }}
            >
              إتمام الشراء
            </Button>
          </div>
        )}
        <DrawerFooter className="px-3 sm:px-4 pt-0">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="luxury-btn-outline w-full touch-friendly text-sm sm:text-base"
            >
              إغلاق
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;