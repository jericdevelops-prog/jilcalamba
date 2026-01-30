import React from 'react';
import { Screen } from '../../types';
import { IconHome, IconBook, IconUsers, IconCalendar, IconEdit } from '../Icons';

interface AppNavbarProps {
  activeScreen: Screen;
  navigate: (screen: Screen) => void;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({ activeScreen, navigate }) => {
  const navItems = [
    { screen: Screen.HOME, icon: IconHome, label: 'Home' },
    { screen: Screen.BIBLE, icon: IconBook, label: 'Bible' },
    { screen: Screen.LIFEGROUP, icon: IconUsers, label: 'Life' },
    { screen: Screen.EVENTS, icon: IconCalendar, label: 'Events' },
    { screen: Screen.NOTES, icon: IconEdit, label: 'Notes' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-lg border-t border-gray-200 pb-4 pt-2 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = activeScreen === item.screen;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.screen)}
            className={`flex flex-col items-center justify-center w-16 transition-all duration-300 ${isActive ? 'text-[#1e1c4d] scale-110' : 'text-gray-400'}`}
          >
            <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity absolute -bottom-3`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
