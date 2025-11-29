import React from 'react';
import { 
  Home, 
  Stethoscope, 
  MessageSquare, 
  Pill, 
  User, 
  AlertCircle,
  Video
} from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isMobileMenuOpen, closeMobileMenu }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: Home },
    { id: AppView.DOCTORS, label: 'Find Doctors', icon: Stethoscope },
    { id: AppView.MEDICINE, label: 'Medicines', icon: Pill },
    { id: AppView.CHAT, label: 'AI Assistant', icon: MessageSquare },
    { id: AppView.VIDEO_CALL, label: 'Teleconsult', icon: Video },
    { id: AppView.PROFILE, label: 'Profile', icon: User },
  ];

  const handleNav = (view: AppView) => {
    onChangeView(view);
    closeMobileMenu();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 flex flex-col
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">+</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">DocNow</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => handleNav(AppView.EMERGENCY)}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-bold transition-colors ${
              currentView === AppView.EMERGENCY
                ? 'bg-red-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white animate-pulse-slow'
            }`}
          >
            <AlertCircle className="w-5 h-5" />
            <span>Emergency SOS</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;