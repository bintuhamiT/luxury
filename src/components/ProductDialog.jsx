import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Star, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { useToast } from '@/components/ui/use-toast';

function ProductDialog({ isProductDialogOpen, setIsProductDialogOpen, selectedProduct, setSelectedProduct, addToCart }) {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState(selectedProduct?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(selectedProduct?.colors?.[0] || '');

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: 'خطأ',
        description: 'يرجى اختيار المقاس واللون قبل الإضافة إلى السلة.',
        variant: 'destructive',
      });
      return;
    }
    addToCart(selectedProduct, selectedSize, selectedColor);
    setIsProductDialogOpen(false);
  };

  if (!selectedProduct) return null;

  return (
    <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
      <DialogContent className="luxury-dialog bg-background/95 backdrop-blur-xl max-w-2xl">
        <DialogHeader className="relative">
          <DialogTitle className="luxury-font-heading text-2xl luxury-text-gradient">
            {selectedProduct.name}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            تفاصيل المنتج
          </DialogDescription>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 luxury-btn-icon touch-friendly"
              aria-label="إغلاق النافذة"
            >
              <X className="h-6 w-6 animate-spin-on-hover" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          <div className="relative">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-80 object-cover rounded-md luxury-shadow"
            />
            {selectedProduct.isNew && (
              <Badge
                variant="secondary"
                className="absolute top-4 left-4 luxury-shadow animate-pulse"
              >
                جديد
              </Badge>
            )}
            {selectedProduct.isSale && (
              <Badge
                variant="destructive"
                className="absolute top-4 right-4 luxury-shadow animate-pulse"
              >
                تخفيض
              </Badge>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground luxury-font-body">{selectedProduct.description}</p>
            <div className="flex items-center space-x-2">
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
              </div>
              <span className="text-sm text-muted-foreground">
                ({selectedProduct.reviews} تقييم)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-accent">{selectedProduct.price}</span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {selectedProduct.originalPrice}
                </span>
              )}
            </div>
            <div className="space-y-4">
              <Select
                value={selectedSize}
                onValueChange={setSelectedSize}
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
                value={selectedColor}
                onValueChange={setSelectedColor}
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
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="luxury-btn-gold w-full touch-friendly"
            onClick={handleAddToCart}
          >
            إضافة إلى السلة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDialog;