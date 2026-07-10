/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime exception caught by SEO ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/?tab=home";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div id="runtime-error-500" className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl space-y-6 animate-fade-in">
            {/* Visual Header */}
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle className="w-8 h-8" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-wider text-red-500 uppercase">
                Runtime Error 500
              </span>
              <h1 className="text-2xl font-sans font-extrabold text-slate-900 tracking-tight leading-snug">
                Execution Thread Aborted
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our analytical engine encountered an unexpected computation crash while rendering this benchmark viewport.
              </p>
            </div>

            {/* Optional Collapsible Diagnostic Logs */}
            {this.state.error && (
              <details className="text-left text-[10px] font-mono bg-slate-50 border border-slate-100 rounded-xl p-3 max-h-32 overflow-y-auto text-slate-600">
                <summary className="cursor-pointer font-bold select-none text-slate-500 mb-1 hover:text-slate-700">
                  Diagnostic Crash Logs
                </summary>
                <p className="whitespace-pre-wrap">{this.state.error.stack || this.state.error.message}</p>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Run</span>
              </button>
              <button
                onClick={this.handleReset}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
