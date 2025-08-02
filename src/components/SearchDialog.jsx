import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog.jsx';
import { Input } from '@/components/ui/input.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Search, X, Clock, TrendingUp, Filter, ArrowRight, Star, Tag } from 'lucide-react';
import { searchItems } from '../data.js';

function SearchDialog({ isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery }) {
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches] = useState([
    'قمصان رجالية', 'فساتين نسائية', 'أحذية رياضية', 'حقائب يد', 'ساعات ذكية'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const inputRef = useRef(null);

  // تصفية النتائج حسب الفئة والبحث
  const filteredItems = searchItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // حفظ البحث الأخير
  const saveSearch = (query) => {
    if (query.trim() && !recentSearches.includes(query)) {
      const newRecentSearches = [query, ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    }
  };

  // تحميل البحثات الأخيرة من التخزين المحلي
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('خطأ في تحميل البحثات الأخيرة:', error);
      }
    }
  }, []);

  // التركيز على حقل البحث عند فتح النافذة
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // معالج البحث
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      saveSearch(query);
    }
  };

  // مسح البحثات الأخيرة
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // فئات البحث
  const categories = [
    { id: 'all', name: 'الكل', icon: Search },
    { id: 'product', name: 'المنتجات', icon: Tag },
    { id: 'category', name: 'الفئات', icon: Filter }
  ];

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogContent className="comfortable-search-dialog bg-white dark:bg-gray-900 max-w-2xl w-[95vw] sm:w-full rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
        
        {/* العنوان */}
        <DialogHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            البحث
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            ابحث عن المنتجات والفئات
          </DialogDescription>
        </DialogHeader>

        {/* حقل البحث */}
        <div className="py-4 space-y-4">
          <div className="relative">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder="ابحث عن منتج أو فئة..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="comfortable-search-input pr-10 pl-4 py-3 text-base rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* فلاتر الفئات */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`comfortable-category-btn flex items-center gap-2 px-3 py-1.5 text-sm rounded-full transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* منطقة النتائج */}
        <ScrollArea className="h-[50vh] comfortable-scroll">
          {searchQuery.length === 0 ? (
            <div className="space-y-6 p-2">
              {/* البحثات الأخيرة */}
              {recentSearches.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      البحثات الأخيرة
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-500 hover:text-red-600 dark:hover:text-red-400 px-2 py-1"
                    >
                      مسح الكل
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="comfortable-recent-badge cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors px-3 py-1 rounded-full text-sm"
                        onClick={() => handleSearch(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* البحثات الشائعة */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  البحثات الشائعة
                </h3>
                <div className="space-y-2">
                  {popularSearches.map((search, index) => (
                    <div
                      key={index}
                      className="comfortable-popular-item flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors group"
                      onClick={() => handleSearch(search)}
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">لا توجد نتائج</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  لم نجد أي نتائج تطابق "<span className="font-medium text-blue-600 dark:text-blue-400">{searchQuery}</span>"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  جرب استخدام كلمات مختلفة أو تحقق من الإملاء
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              <div className="mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  تم العثور على <span className="font-medium text-blue-600 dark:text-blue-400">{filteredItems.length}</span> نتيجة
                </p>
              </div>
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="comfortable-result-item group p-3 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600 transition-colors cursor-pointer"
                  onClick={() => {
                    window.location.href = item.link;
                    setIsSearchOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${item.type === 'product' ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
                        {item.type === 'product' ? (
                          <Tag className={`h-3 w-3 ${item.type === 'product' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} />
                        ) : (
                          <Filter className={`h-3 w-3 ${item.type === 'product' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {item.type === 'product' ? 'منتج' : 'فئة'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.rating && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-50 dark:bg-yellow-900/30 rounded-full">
                          <Star className="h-2.5 w-2.5 text-yellow-500 fill-current" />
                          <span className="text-xs text-yellow-700 dark:text-yellow-400">{item.rating}</span>
                        </div>
                      )}
                      <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* تلميحات البحث */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-500 space-x-2 rtl:space-x-reverse">
            <span>💡 نصيحة:</span>
            <span>استخدم كلمات مفتاحية قصيرة للحصول على أفضل النتائج</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;

