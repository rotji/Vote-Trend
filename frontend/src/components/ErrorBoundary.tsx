import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error for development
    console.error('🚨 React Error Boundary caught an error:', error);
    console.error('🚨 Error Info:', errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI for development
      return (
        <div style={{
          padding: '2rem',
          margin: '2rem',
          border: '2px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#ffe0e0',
          color: '#d63031',
          fontFamily: 'monospace',
        }}>
          <h2>🚨 Something went wrong!</h2>
          <p>An error occurred in this component. This is a development error boundary.</p>
          
          <button 
            onClick={this.handleRetry}
            style={{
              padding: '0.5rem 1rem',
              margin: '1rem 0',
              backgroundColor: '#0984e3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Try Again
          </button>

          {/* Show error details in development */}
          {import.meta.env.DEV && (
            <details style={{ marginTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                🔍 Error Details (Development Only)
              </summary>
              <div style={{ 
                marginTop: '0.5rem', 
                padding: '1rem', 
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                whiteSpace: 'pre-wrap',
                fontSize: '0.875rem',
              }}>
                <strong>Error:</strong> {this.state.error?.message}
                <br />
                <strong>Stack:</strong>
                <pre style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
                  {this.state.error?.stack}
                </pre>
              </div>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;