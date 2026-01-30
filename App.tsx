import React, { Suspense } from 'react';
import { Screen } from './types';
import { useAppNavigation } from './hooks/useAppNavigation';
import { LifegroupProvider } from './context/LifegroupContext';
import { NotesProvider } from './context/NotesContext';
import { AppNavbar } from './components/layout/AppNavbar';
import { HomeView } from './components/HomeView';
import { BibleView } from './components/BibleView';
import { NotesView } from './components/NotesView';
import { LoginView } from './components/LoginView';

// Simple loading component
const Loading = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#f9fafb]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e1c4d]"></div>
  </div>
);

// Placeholder views for unfinished modules
const PlaceholderView = ({ title }: { title: string }) => (
  <div className="pt-20 px-4 flex flex-col items-center justify-center h-full text-center">
    <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
    <h2 className="text-xl font-bold text-[#1e1c4d]">{title}</h2>
    <p className="text-gray-500 mt-2">This feature is coming soon.</p>
  </div>
);

const AppContent = () => {
  const { activeScreen, navigate } = useAppNavigation();

  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.LOGIN:
        return <LoginView onComplete={() => navigate(Screen.HOME)} />;
      case Screen.HOME:
        return <HomeView />;
      case Screen.BIBLE:
        return <BibleView />;
      case Screen.NOTES:
        return <NotesView />;
      case Screen.LIFEGROUP:
        return <PlaceholderView title="Life Groups" />;
      case Screen.EVENTS:
        return <PlaceholderView title="Events" />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="font-sans text-[#1e1c4d] bg-[#f9fafb] min-h-screen relative overflow-hidden">
      {renderScreen()}
      {activeScreen !== Screen.LOGIN && (
        <AppNavbar activeScreen={activeScreen} navigate={navigate} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <LifegroupProvider>
      <NotesProvider>
        <Suspense fallback={<Loading />}>
          <AppContent />
        </Suspense>
      </NotesProvider>
    </LifegroupProvider>
  );
}
