
import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const handleShare = async (product: Product) => {
    const shareText = `شاهد هذا المنتج الرائع في ماركت اليسر:
📦 المنتج: ${product.name}
💰 السعر: ${product.price} ج.م
📍 اطلبه الآن من ماركت اليسر!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Open WhatsApp with the product info
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-darkSurface rounded-3xl shadow-inner border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400 text-lg">نعتذر، لا توجد منتجات متوفرة حالياً في هذا القسم.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white dark:bg-darkSurface rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col group">
          <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-[#252525]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Category Tag */}
            <div className="absolute top-4 right-4 bg-yosrOrange/90 backdrop-blur-sm text-yosrGreen text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
              {product.category}
            </div>
            
            {/* Share Button Overlay */}
            <button 
              onClick={() => handleShare(product)}
              className="absolute top-4 left-4 p-2 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-yosrGreen dark:text-yosrOrange hover:scale-110 transition-transform shadow-md"
              title="مشاركة المنتج"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 mb-2 group-hover:text-yosrGreen transition-colors">{product.name}</h3>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-yosrGreen dark:text-yosrOrange font-black text-2xl leading-none">
                {product.price}
              </span>
              <span className="text-xs font-bold text-gray-400">ج.م</span>
            </div>
            
            <button
              onClick={() => onAddToCart(product)}
              className="mt-auto w-full bg-yosrGreen dark:bg-green-800 hover:bg-yosrGreen dark:hover:bg-green-700 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-green-100 dark:shadow-none"
            >
              <svg className="w-5 h-5 group-hover/btn:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              أضف للسلة
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
