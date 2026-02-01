
import React, { useState, useMemo } from 'react';
import { Product, CATEGORIES } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  adminPassword: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onSaveProducts, adminPassword }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [adminSearch, setAdminSearch] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert("عذراً، كلمة المرور غير صحيحة");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("هل تريد حذف هذا المنتج نهائياً من المتجر؟")) {
      onSaveProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      if (editingProduct.id) {
        onSaveProducts(products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p));
      } else {
        const newProduct = {
          ...editingProduct,
          id: Math.random().toString(36).substr(2, 9),
          image: editingProduct.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
        } as Product;
        onSaveProducts([...products, newProduct]);
      }
      setEditingProduct(null);
    }
  };

  const filteredAdminProducts = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(adminSearch.toLowerCase()));
  }, [products, adminSearch]);

  const totalValue = useMemo(() => {
    return products.reduce((sum, p) => sum + p.price, 0);
  }, [products]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-10 bg-white dark:bg-darkSurface rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="logo-oval px-6 py-3 mb-4">
             <span className="text-xl font-black text-yosrGreen">ماركت اليسر</span>
          </div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">دخول الإدارة</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold opacity-60 mr-2">كلمة المرور</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full border-2 border-gray-100 dark:border-gray-800 dark:bg-darkBg rounded-2xl px-6 py-4 focus:border-yosrGreen outline-none text-center font-bold tracking-widest transition-all"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
          </div>
          <button className="w-full bg-yosrGreen text-white font-black py-4 rounded-2xl hover:brightness-110 shadow-lg shadow-green-100 dark:shadow-none transition-all">
            دخول الآن
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-darkSurface p-6 rounded-[2rem] border border-gray-50 dark:border-gray-800 shadow-sm flex flex-col items-center">
          <span className="text-xs font-black opacity-50 uppercase tracking-widest mb-1">إجمالي المنتجات</span>
          <span className="text-3xl font-black text-yosrGreen">{products.length}</span>
        </div>
        <div className="bg-white dark:bg-darkSurface p-6 rounded-[2rem] border border-gray-50 dark:border-gray-800 shadow-sm flex flex-col items-center">
          <span className="text-xs font-black opacity-50 uppercase tracking-widest mb-1">متوسط الأسعار</span>
          <span className="text-3xl font-black text-yosrOrange">
            {products.length ? (totalValue / products.length).toFixed(1) : 0} <span className="text-sm">ج.م</span>
          </span>
        </div>
        <div className="bg-yosrGreen p-6 rounded-[2rem] shadow-lg flex items-center justify-between cursor-pointer hover:scale-105 transition-transform" onClick={() => setEditingProduct({ name: '', price: 0, category: CATEGORIES[1], image: '' })}>
          <div className="text-white">
            <h4 className="font-black text-xl">إضافة منتج</h4>
            <p className="text-xs opacity-70">أدخل منتجاً جديداً للمتجر</p>
          </div>
          <svg className="w-10 h-10 text-yosrOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      {/* Admin Search & Controls */}
      <div className="bg-white dark:bg-darkSurface p-6 rounded-[2rem] shadow-sm border border-gray-50 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <input 
              type="text" 
              placeholder="ابحث عن منتج لتعديله..."
              className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-yosrGreen dark:text-white"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="text-sm font-bold text-gray-400 whitespace-nowrap">
            يظهر {filteredAdminProducts.length} من {products.length}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdminProducts.map(p => (
          <div key={p.id} className="bg-white dark:bg-darkSurface p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-4 group hover:border-yosrGreen transition-colors">
             <div className="relative">
               <img src={p.image} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
               <div className="absolute -top-2 -right-2 bg-yosrGreen text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg">
                 #{p.id.slice(-4)}
               </div>
             </div>
             <div className="flex-grow">
                <h4 className="font-black text-gray-800 dark:text-white line-clamp-1">{p.name}</h4>
                <p className="text-yosrGreen dark:text-yosrOrange font-black">{p.price} ج.م</p>
                <span className="text-[10px] bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-2 py-0.5 rounded-full font-bold">{p.category}</span>
             </div>
             <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingProduct(p)} 
                  className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                  title="تعديل"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleDelete(p.id)} 
                  className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                  title="حذف"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
             </div>
          </div>
        ))}
        {filteredAdminProducts.length === 0 && (
          <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-darkSurface rounded-[2.5rem] border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-400 font-bold">لم يتم العثور على نتائج للبحث في الإدارة</p>
          </div>
        )}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-darkSurface rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-gray-100 dark:border-gray-800">
            <div className="bg-yosrGreen text-white p-8">
              <h3 className="text-2xl font-black">{editingProduct.id ? 'تعديل البيانات' : 'إضافة لليسير'}</h3>
            </div>
            <form onSubmit={handleSaveProduct} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-black opacity-50 mr-2">اسم المنتج</label>
                <input 
                  required
                  className="w-full border-2 border-gray-100 dark:border-gray-800 dark:bg-darkBg rounded-2xl px-5 py-3 outline-none focus:border-yosrGreen font-bold"
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                  <label className="text-xs font-black opacity-50 mr-2">السعر (ج.م)</label>
                  <input 
                    required
                    type="number"
                    className="w-full border-2 border-gray-100 dark:border-gray-800 dark:bg-darkBg rounded-2xl px-5 py-3 outline-none focus:border-yosrGreen font-bold"
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black opacity-50 mr-2">القسم</label>
                  <select 
                    className="w-full border-2 border-gray-100 dark:border-gray-800 dark:bg-darkBg rounded-2xl px-5 py-3 outline-none focus:border-yosrGreen font-bold"
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                  >
                    {CATEGORIES.filter(c => c !== "الكل").map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black opacity-50 mr-2">رابط الصورة</label>
                <input 
                  className="w-full border-2 border-gray-100 dark:border-gray-800 dark:bg-darkBg rounded-2xl px-5 py-3 outline-none focus:border-yosrGreen font-bold"
                  placeholder="https://images..."
                  value={editingProduct.image}
                  onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl font-black text-gray-500 hover:bg-gray-200 transition-colors">إلغاء</button>
                <button type="submit" className="flex-[2] py-4 bg-yosrGreen text-white rounded-2xl font-black shadow-lg hover:brightness-110 transition-all">حفظ التغييرات</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
