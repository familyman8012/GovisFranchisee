import React, { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent?: React.ComponentType<{ error: Error | null }>;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(`getDerivedStateFromError, ${error}`);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.log('errorInfo', errorInfo);
    console.log(`componentDidCatch: ${errorInfo}`);
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallbackComponent, children } = this.props;

    if (hasError) {
      if (fallbackComponent) {
        const FallbackComponent = fallbackComponent;
        return <FallbackComponent error={error} />;
      }

      return (
        <div>
          <h2>Error occured!!</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            {errorInfo && errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
