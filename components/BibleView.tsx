import React, { useState, useEffect } from 'react';
import { BIBLE_BOOKS } from '../constants';
import { IconChevronLeft } from './Icons';

export const BibleView: React.FC = () => {
  const [book, setBook] = useState('John');
  const [chapter, setChapter] = useState(3);
  const [text, setText] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchChapter();
  }, [book, chapter]);

  const fetchChapter = async () => {
    setLoading(true);
    try {
      const cacheKey = `jil_bible_${book}_${chapter}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setText(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fallback for offline or API limits: very basic mock if fetch fails
      const res = await fetch(`https://bible-api.com/${book}+${chapter}`);
      const data = await res.json();
      
      localStorage.setItem(cacheKey, JSON.stringify(data.verses));
      setText(data.verses);
    } catch (e) {
      console.error("Bible API Error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#f9fafb] flex flex-col animate-[fadeInScale_0.3s_ease-out]">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex justify-between items-center shadow-sm">
        <h2 
          onClick={() => setShowPicker(true)}
          className="text-2xl font-bold text-[#1e1c4d] flex items-center gap-2 cursor-pointer active:opacity-60"
        >
          {book} {chapter} <span className="text-xs text-gray-400">▼</span>
        </h2>
        <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#1e1c4d]">
          Aa
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 pt-4">
        {loading ? (
          <div className="space-y-4 animate-pulse mt-4">
             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
             <div className="h-4 bg-gray-200 rounded w-full"></div>
             <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          <div className="prose prose-lg font-serif text-gray-800 leading-8">
            {text.map((v: any) => (
              <span key={v.verse} className="hover:bg-yellow-100 cursor-pointer transition-colors rounded px-1">
                <sup className="text-xs font-sans text-gray-400 mr-1 font-bold">{v.verse}</sup>
                {v.text}{' '}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Book Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-[400px] h-[80%] rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-[slideInUp_0.3s_ease-out]">
            <div className="p-4 border-b flex items-center justify-between bg-gray-50">
              <button onClick={() => setShowPicker(false)} className="p-2"><IconChevronLeft /></button>
              <span className="font-bold">Select Book</span>
              <div className="w-8"></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-2">
              {BIBLE_BOOKS.map(b => (
                <button 
                  key={b} 
                  onClick={() => { setBook(b); setChapter(1); setShowPicker(false); }}
                  className={`p-3 text-left rounded-xl text-sm font-medium ${book === b ? 'bg-[#1e1c4d] text-white' : 'bg-gray-50 text-gray-600'}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
