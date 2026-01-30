import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Note } from '../types';

interface NotesContextType {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('jil_notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('jil_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      folder: 'General',
      isLocked: false,
      updatedAt: Date.now()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, content: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, content, updatedAt: Date.now() } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};