import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminLogin } from './AdminLogin';
import { Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onBackToPortfolio?: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  onBackToPortfolio 
}) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#131314] text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
              <Shield className="w-7 h-7 animate-pulse" />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-sky-500/20 blur-sm -z-10 animate-ping" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-white tracking-wide">
              Verifying Executive Security Credentials
            </p>
            <p className="text-xs text-neutral-400 font-mono">
              Checking Firebase Auth session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If no logged in session exists, guard with AdminLogin component
  if (!isLoggedIn) {
    return <AdminLogin onBackToPortfolio={onBackToPortfolio} />;
  }

  // Session authenticated and authorized
  return <>{children}</>;
};
