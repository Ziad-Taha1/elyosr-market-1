
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  view: AppView;
  setView: (view: AppView) => void;
  cartCount: number;
  onOpenCart: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView, cartCount, onOpenCart, isDarkMode, onToggleTheme }) => {
  return (
    <header className="bg-yosrGreen dark:bg-[#052217] text-white shadow-xl sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Name */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView(AppView.CUSTOMER)}
        >
          <div className="logo-oval px-4 py-2 flex flex-col items-center justify-center group-hover:scale-105 transition-transform shadow-md">
            <span className="text-sm font-black text-yosrGreen leading-none">ماركت</span>
            <span className="text-xl font-black text-yosrGreen leading-none">اليسر</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black text-yosrOrange tracking-tighter hidden sm:block">EL YOSR</h1>
            <span className="text-[10px] opacity-60 hidden sm:block">MARKET</span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-green-900/40 hover:bg-green-800 transition-colors"
            title={isDarkMode ? "الوضع المضيء" : "الوضع الليلي"}
          >
            {isDarkMode ? (
              <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.242 16.242l.707.707M7.757 7.757l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button 
            onClick={() => setView(view === AppView.CUSTOMER ? AppView.ADMIN : AppView.CUSTOMER)}
            className="px-4 py-2 rounded-xl bg-yosrOrange text-yosrGreen hover:brightness-110 transition-all text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg"
          >
            {view === AppView.CUSTOMER ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
                <span className="hidden sm:inline">لوحة التحكم</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">المتجر</span>
              </>
            )}
          </button>

          {view === AppView.CUSTOMER && (
            <button 
              onClick={onOpenCart}
              className="relative p-2 rounded-full hover:bg-green-800 transition-colors"
            >
              <svg className="w-7 h-7 text-yosrOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-yosrGreen animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
