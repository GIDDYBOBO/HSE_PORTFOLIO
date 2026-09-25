import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Check if error is from a browser extension (like MetaMask)
    const msg = (error?.message || '').toLowerCase();
    if (msg.includes('metamask') || msg.includes('ethereum')) {
      return { hasError: false };
    }
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const msg = (error?.message || '').toLowerCase();
    if (!msg.includes('metamask') && !msg.includes('ethereum')) {
      console.error('Uncaught application error:', error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#131314] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-6 rounded-2xl bg-[#1e1f20] border border-white/10 space-y-4">
            <h2 className="text-xl font-bold font-display leading-snug sm:leading-tight">Something went wrong</h2>
            <p className="text-xs text-neutral-400">
              An unexpected error occurred while loading this view.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
