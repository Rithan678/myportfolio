"use client";

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">Application Error</h2>
            <p className="text-gray-700 mb-4">Something went wrong with the application:</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-64">
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64 mt-2">
              {this.state.error?.stack || 'No stack trace'}
            </pre>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;