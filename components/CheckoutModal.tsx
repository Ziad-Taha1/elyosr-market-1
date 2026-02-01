
import React, { useState } from 'react';
import { OrderInfo } from '../types';

interface CheckoutModalProps {
  onClose: () => void;
  onConfirm: (info: OrderInfo) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onConfirm }) => {
  const [formData, setFormData] = useState<OrderInfo>({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.address) {
      onConfirm(formData);
    } else {
      alert("يرجى ملء جميع الحقول الإلزامية");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-green-600 text-white p-6">
          <h2 className="text-2xl font-bold text-center">بيانات التوصيل</h2>
          <p className="text-center opacity-90 text-sm mt-1">يرجى إكمال البيانات لإرسال الطلب عبر الواتساب</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل *</label>
            <input 
              required
              type="text" 
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="مثال: محمد أحمد"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف *</label>
            <input 
              required
              type="tel" 
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none text-left"
              placeholder="01xxxxxxxxx"
              dir="ltr"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">العنوان بالتفصيل *</label>
            <input 
              required
              type="text" 
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="الشارع، رقم العمارة، الطابق..."
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">ملاحظات إضافية</label>
            <textarea 
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none h-24 resize-none"
              placeholder="أي تفاصيل أخرى تريد إضافتها..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              إلغاء
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
            >
              إرسال الطلب (واتساب)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
