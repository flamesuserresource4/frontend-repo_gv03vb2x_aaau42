import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('UI error captured:', error, info);
  }

  render() {
    const { hasError } = this.state;
    const { fallback = null, children } = this.props;
    if (hasError) {
      return fallback || (
        <div className="p-6 rounded-xl bg-rose-500/10 text-rose-200 ring-1 ring-rose-500/20">
          Something went wrong, but the rest of the app is still available.
        </div>
      );
    }
    return children;
  }
}
