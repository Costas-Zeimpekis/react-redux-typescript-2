import React, { Component } from 'react';

export class ErrorBoundry extends Component {
  state = { error: false };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details>{this.state.error && this.state.error.toString()}</details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
