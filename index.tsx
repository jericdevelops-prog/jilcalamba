import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public props: Readonly<ErrorBoundaryProps>;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center mt-20"><h2>Something went wrong.</h2><p>Please restart the app.</p></div>;
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* Landscape Lock Overlay */}
      <div className="hidden landscape:flex fixed inset-0 z-[100] bg-[#1e1c4d] items-center justify-center text-white p-8 text-center">
        <div>
          <div className="text-4xl mb-4">📱</div>
          <h2 className="text-2xl font-bold mb-2">Please Rotate Your Device</h2>
          <p className="text-gray-300">This app is designed for portrait mode.</p>
        </div>
      </div>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);