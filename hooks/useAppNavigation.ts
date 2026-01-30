import { useState, useCallback } from 'react';
import { Screen } from '../types';

export const useAppNavigation = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.HOME);
  const [history, setHistory] = useState<Screen[]>([Screen.HOME]);

  const navigate = useCallback((screen: Screen) => {
    setActiveScreen(screen);
    setHistory(prev => [...prev, screen]);
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = [...prev];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      setActiveScreen(previousScreen);
      return newHistory;
    });
  }, []);

  return { activeScreen, navigate, goBack, history };
};
