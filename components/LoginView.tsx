import React, { useState } from 'react';
import { useLifegroup } from '../context/LifegroupContext';
import { UserRole } from '../types';
import { mockLogin } from '../services/supabaseClient';
import { IconLock } from './Icons';

export const LoginView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserRole } = useLifegroup();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await mockLogin(email);
      setUserRole(user.role as UserRole);
      onComplete();
    } catch (error) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    setUserRole(UserRole.GUEST);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#1e1c4d] flex flex-col items-center justify-center p-6 text-white animate-[fadeInScale_0.5s_ease-out]">
      <div className="w-20 h-20 bg-[#FBBF24] rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(251,191,36,0.4)]">
        <span className="text-[#1e1c4d] text-2xl font-bold">JIL</span>
      </div>
      <h2 className="text-3xl font-bold mb-1">Welcome Home</h2>
      <p className="text-gray-400 mb-8">Sign in to continue</p>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24]"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <IconLock className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24]"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button 
          disabled={loading}
          className="w-full bg-[#FBBF24] text-[#1e1c4d] font-bold py-4 rounded-2xl mt-4 active:scale-95 transition-transform"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <button 
        onClick={handleGuest}
        className="mt-6 text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white"
      >
        Continue as Guest
      </button>

      <div className="absolute bottom-8 text-xs text-gray-600">
        JIL Pasay App v1.0
      </div>
    </div>
  );
};
