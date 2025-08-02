import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog.jsx';
import { Input } from '@/components/ui/input.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Search, X } from 'lucide-react';
import { searchItems } from '../data.js';

function SearchDialog({ isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery }) {
  const filteredItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogContent className="luxury-dialog bg-background/90 backdrop-blur-md max-w-sm sm:max-w-md lg:max-w-lg rounded-lg">
        <DialogHeader className="relative pb-4">
          <DialogTitle className="luxury-font-heading text-xl sm:text-2xl md:text-3xl luxury-text-gradient animate-slide-in-up">
            البحث
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground luxury-font-body animate-fade-in-up">
            ابحث عن المنتجات أو الفئات
          </DialogDescription>
        </DialogHeader>
        <div className="py-3 sm:py-4">
          <div className="relative">
            <Search className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ابحث عن منتج أو فئة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="luxury-input pr-8 sm:pr-10 py-2 sm:py-2.5 text-sm sm:text-base rounded-md"
            />
          </div>
        </div>
        <ScrollArea className="h-[40vh] sm:h-[50vh] px-3 sm:px-4">
          {searchQuery.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-muted-foreground luxury-font-body animate-fade-in-up">
              اكتب كلمة للبحث عن المنتجات أو الفئات
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-muted-foreground luxury-font-body animate-fade-in-up">
              لا توجد نتائج تطابق البحث
            </div>
          ) : (
            <div className="space-y-1 sm:space-y-2">
              {filteredItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="block px-3 sm:px-4 py-2 sm:py-3 luxury-nav-link text-sm sm:text-base bg-background/50 backdrop-blur-sm rounded-md hover:bg-accent/20 luxury-shadow-hover transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                  onClick={() => setIsSearchOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {item.type === 'product' ? 'منتج' : 'فئة'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;