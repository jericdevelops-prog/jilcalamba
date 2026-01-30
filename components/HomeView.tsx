import React, { useState, useEffect } from 'react';
import { MOCK_EVENTS, COLORS } from '../constants';
import { IconSearch } from './Icons';

export const HomeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'WELCOME' | 'ABOUT' | 'FIND'>('WELCOME');
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const TabButton = ({ id, label }: { id: typeof activeTab, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        activeTab === id 
          ? 'bg-[#1e1c4d] text-white shadow-lg' 
          : 'bg-white text-gray-500 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="pt-8 pb-24 px-4 min-h-screen bg-[#f9fafb] animate-[fadeInScale_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1e1c4d] tracking-tight">{greeting},</h1>
          <p className="text-gray-500 font-medium">Child of God</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#FBBF24] flex items-center justify-center shadow-lg text-[#1e1c4d] font-bold">
          JIL
        </div>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <TabButton id="WELCOME" label="Welcome" />
        <TabButton id="ABOUT" label="About Us" />
        <TabButton id="FIND" label="Find Us" />
      </div>

      {activeTab === 'WELCOME' && (
        <div className="space-y-6">
          {/* Daily Verse Card */}
          <div className="bg-gradient-to-br from-[#1e1c4d] to-[#2d2a6e] rounded-[2.5rem] p-6 text-white shadow-[0_10px_30px_rgba(30,28,77,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <h3 className="text-[#FBBF24] font-bold text-sm uppercase tracking-wider mb-2">Verse of the Day</h3>
            <p className="font-serif text-lg leading-relaxed mb-4 italic">
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </p>
            <p className="text-right text-sm font-semibold opacity-80">Jeremiah 29:11</p>
          </div>

          {/* Upcoming Events Horizontal Scroll */}
          <div>
            <h3 className="text-[#1e1c4d] font-bold text-lg mb-4 pl-2">Upcoming Events</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 snap-x">
              {MOCK_EVENTS.map(ev => (
                <div key={ev.id} className="min-w-[280px] snap-center bg-white rounded-3xl p-3 shadow-sm border border-gray-100">
                  <div className="h-32 w-full rounded-2xl bg-gray-200 mb-3 overflow-hidden">
                    <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md">{ev.category}</span>
                    <h4 className="font-bold text-[#1e1c4d] mt-1 text-sm">{ev.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{ev.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ABOUT' && (
        <div className="space-y-4 animate-[slideInUp_0.3s_ease-out]">
          {['Core Values', 'Mission', 'Vision', 'Tenets of Faith'].map((item) => (
            <div key={item} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center group active:scale-95 transition-transform">
              <span className="font-bold text-[#1e1c4d]">{item}</span>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#1e1c4d] group-hover:text-white transition-colors">
                →
              </div>
            </div>
          ))}
        </div>
      )}

       {activeTab === 'FIND' && (
        <div className="space-y-4 animate-[slideInUp_0.3s_ease-out]">
           <div className="relative">
            <IconSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search location..." 
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-[#1e1c4d] outline-none text-[#1e1c4d]"
            />
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-[#1e1c4d]">JIL Pasay Center</h4>
            <p className="text-sm text-gray-500 mt-1">123 Roxas Blvd, Pasay City</p>
            <p className="text-xs text-[#FBBF24] mt-2 font-bold">SUNDAYS 7:00 AM / 10:00 AM / 3:00 PM</p>
          </div>
        </div>
      )}
    </div>
  );
};
