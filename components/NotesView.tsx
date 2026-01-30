import React, { useState, useRef } from 'react';
import { useNotes } from '../context/NotesContext';
import { IconCheck, IconChevronLeft } from './Icons';

export const NotesView: React.FC = () => {
  const { notes, addNote, updateNote } = useNotes();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempContent, setTempContent] = useState('');

  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleCreate = () => {
    addNote('New Note', '');
    // Select the newly created note (assuming it's first in list due to prepend)
    // We need a slight delay or refactor context to return the ID. 
    // For simplicity, we just toggle list view and let user click.
  };

  const handleOpen = (note: any) => {
    setActiveNoteId(note.id);
    setTempTitle(note.title);
    setTempContent(note.content);
  };

  const handleBack = () => {
    if (activeNoteId) {
      updateNote(activeNoteId, tempContent); // Auto save
    }
    setActiveNoteId(null);
  };

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    
    // Math Solver Logic
    if (val.endsWith('=')) {
      // Look for the last line or expression
      const lines = val.split('\n');
      const lastLine = lines[lines.length - 1];
      const expression = lastLine.replace('=', '').trim();
      
      try {
        // Safe enough for a demo math solver.
        // eslint-disable-next-line no-new-func
        const result = new Function(`return ${expression}`)();
        if (result !== undefined && !isNaN(result)) {
            setTempContent(val + ' ' + result);
            return;
        }
      } catch (err) {
        // Ignore math errors
      }
    }
    setTempContent(val);
  };

  if (activeNoteId) {
    return (
      <div className="h-screen bg-white flex flex-col animate-[fadeInScale_0.3s_ease-out]">
        <div className="px-4 py-4 pt-12 border-b flex items-center justify-between">
          <button onClick={handleBack} className="p-2 -ml-2 text-[#1e1c4d]">
            <IconChevronLeft className="w-6 h-6" />
          </button>
          <input 
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            className="text-center font-bold text-[#1e1c4d] text-lg outline-none bg-transparent"
          />
          <button onClick={handleBack} className="p-2 text-green-600"><IconCheck className="w-6 h-6" /></button>
        </div>
        <textarea
          className="flex-1 p-6 text-lg leading-relaxed outline-none resize-none font-sans"
          value={tempContent}
          onChange={handleEditorChange}
          placeholder="Start typing... (Try '5+5=')"
        />
      </div>
    );
  }

  return (
    <div className="pt-12 px-4 pb-24 h-screen bg-[#f9fafb] animate-[fadeInScale_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1e1c4d]">Notes</h1>
        <button onClick={handleCreate} className="bg-[#1e1c4d] text-white w-10 h-10 rounded-full text-2xl pb-1 flex items-center justify-center shadow-lg active:scale-95 transition-transform">+</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {notes.map(note => (
          <div 
            key={note.id} 
            onClick={() => handleOpen(note)}
            className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 h-40 flex flex-col active:scale-95 transition-all"
          >
            <h3 className="font-bold text-[#1e1c4d] truncate">{note.title}</h3>
            <p className="text-xs text-gray-400 mt-1 mb-2">{new Date(note.updatedAt).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500 line-clamp-3 flex-1">{note.content || 'No content'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
