import React from 'react';
import { Home, Search, Calendar, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define your 4 necessary pages
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={22} />, path: '/' },
    { id: 'search', label: 'Search', icon: <Search size={22} />, path: '/search' },
    { id: 'appointment', label: 'Appointmnet', icon: <Calendar size={22} />, path: '/appointments' }, // Kept your reference spelling
    { id: 'profile', label: 'Profile', icon: <User size={22} />, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-lg border-t border-gray-100 px-6 pb-6 pt-3 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 group relative transition-all"
            >
              {/* Active Indicator Dot */}
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
              )}
              
              <div className={`transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 scale-110' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`}>
                {item.icon}
              </div>
              
              <span className={`text-[10px] font-bold uppercase tracking-tighter transition-all ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}