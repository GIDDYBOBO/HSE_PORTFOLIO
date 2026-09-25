import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onBackToPortfolio?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToPortfolio }) => {
  const { loginWithEmail, loginWithGoogle, demoLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await loginWithEmail(email, password);
    } catch (err: any) {
      console.error('Login failure:', err);
      let msg = 'Authentication failed. Please check your credentials.';
      if (err.code === 'auth/wrong-password') msg = 'Incorrect password entered.';
      if (err.code === 'auth/invalid-email') msg = 'Invalid email address format.';
      if (err.code === 'auth/weak-password') msg = 'Password should be at least 6 characters.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    try {
      setLoading(true);
      setError(null);
      await demoLogin();
    } catch (err: any) {
      setError('Failed to authenticate executive demo session.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await loginWithGoogle();
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in was interrupted or not configured.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#131314] via-[#1e1f20] to-[#131314] text-white">
      <div className="w-full max-w-md">
        {/* Navigation / Theme Bar */}
        <div className="flex items-center justify-between mb-6">
          {onBackToPortfolio ? (
            <button
              type="button"
              id="btn-login-back-to-portfolio"
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Portfolio</span>
            </button>
          ) : null}
        </div>

        <div className="rounded-3xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-400 mx-auto flex items-center justify-center shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300">
              Executive Directorship CMS
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-display leading-snug sm:leading-tight">
              Admin Authentication
            </h1>
            <p className="text-xs text-neutral-400">
              Sign in to manage Engr. Osazee&apos;s credentials, megaproject highlights, and client inquiries.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                Executive Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@iyenomaosazee.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Executive Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-3 text-[11px] font-mono text-neutral-500">OR QUICK ACCESS</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="space-y-2.5">
            {/* Quick Demo Login */}
            <button
              type="button"
              onClick={handleDemoAccess}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-200 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>One-Click Executive Admin Access</span>
            </button>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-neutral-300 hover:text-white text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z"/>
                <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z"/>
              </svg>
              <span>Continue with Google Workspace</span>
            </button>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Firebase Auth Guarded
            </span>
            <span>Zero-Trust RBAC</span>
          </div>
        </div>
      </div>
    </div>
  );
};
