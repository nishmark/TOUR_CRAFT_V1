"use client";

import React, { useState, useEffect, useCallback } from "react";

interface TourStep {
  // Basic element identification
  elementType: string;
  id: string | null;
  className: string | null;
  selector: string;

  // Element content
  textContent: string;
  innerHTML: string;
  value: string | null;

  // All HTML attributes
  attributes: Record<string, string>;

  // Form-specific data (if applicable)
  formData?: {
    type?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    checked?: boolean;
    selectedIndex?: number;
    options?: Array<{
      text: string;
      value: string;
      selected: boolean;
    }>;
    rows?: number;
    cols?: number;
  } | null;

  // Element position and dimensions
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  viewportPosition: {
    x: number;
    y: number;
  };

  // Element visibility and state
  isVisible: boolean;
  isClickable: boolean;

  // Element hierarchy
  parent: {
    tagName: string;
    id: string;
    className: string;
  } | null;
  children: Array<{
    tagName: string;
    id: string;
    className: string;
    textContent: string;
  }>;

  // Computed styles (key ones)
  styles: {
    backgroundColor: string;
    color: string;
    fontSize: string;
    fontFamily: string;
    border: string;
    borderRadius: string;
    display: string;
    position: string;
    zIndex: string;
    cursor: string;
  };

  // Page context
  url: string;
  pageTitle: string;

  // Tour metadata
  timestamp: string;
  stepNumber: number;

  // Additional element properties
  scrollTop: number;
  scrollLeft: number;
  clientWidth: number;
  clientHeight: number;
  offsetWidth: number;
  offsetHeight: number;

  // Accessibility information
  accessibility: {
    role: string | null;
    ariaLabel: string | null;
    ariaDescribedBy: string | null;
    tabIndex: number;
    title: string;
  };

  metadata?: {
    userAgent: string;
    url: string;
    title: string;
  };
}

export default function BuildTourPage() {
  const [tourSteps, setTourSteps] = useState<TourStep[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastCount, setLastCount] = useState(0);

  // Fetch tour steps from API
  const fetchTourSteps = useCallback(async () => {
    try {
      const response = await fetch("/api/Buildtour");
      if (response.ok) {
        const data = await response.json();
        console.log("🔍 Raw API Response:", data);
        console.log("🔍 First step data:", data.steps?.[0]);
        setTourSteps(data.steps || []);
        setIsConnected(true);

        // Show notification if new steps were added
        if (data.steps?.length > lastCount) {
          setLastCount(data.steps.length);
        }
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.error("Failed to fetch tour steps:", error);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    // Fetch immediately
    fetchTourSteps();

    // Then poll every 2 seconds for new data
    const interval = setInterval(fetchTourSteps, 2000);

    return () => clearInterval(interval);
  }, [fetchTourSteps]);

  const clearSteps = async () => {
    // For now, just clear the UI. In production, you'd call a delete API
    setTourSteps([]);
    setLastCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Tour Builder Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use the Chrome extension to start building guided tours. Click
            elements on any website to record tour steps.
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className={`w-4 h-4 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Extension Status
                </h3>
                <p className="text-gray-600">
                  {isConnected
                    ? "Connected - Receiving tour data"
                    : "Waiting for extension..."}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">
                {tourSteps.length}
              </div>
              <div className="text-sm text-gray-500">Steps Recorded</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            How to Use
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">Install Extension</p>
                  <p className="text-gray-600 text-sm">
                    Load the Chrome extension in developer mode
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900">Start Building</p>
                  <p className="text-gray-600 text-sm">
                    Click the extension icon and start tour building
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">Navigate & Click</p>
                  <p className="text-gray-600 text-sm">
                    Go to your website and click elements to record
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <div>
                  <p className="font-medium text-gray-900">Monitor Progress</p>
                  <p className="text-gray-600 text-sm">
                    Watch tour steps appear here in real-time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tour Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Recorded Tour Steps
            </h3>
            {tourSteps.length > 0 && (
              <button
                onClick={clearSteps}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Clear Steps
              </button>
            )}
          </div>

          {tourSteps.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🎯</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                No tour steps recorded yet
              </h4>
              <p className="text-gray-600">
                Start using the Chrome extension to record tour steps
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tourSteps.map((step, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                          {step.stepNumber}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                            {step.elementType}
                          </span>
                          {step.id && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              #{step.id}
                            </span>
                          )}
                          {step.isClickable && (
                            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                              clickable
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="ml-11 space-y-2">
                        <p className="font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          {step.selector}
                        </p>

                        {step.textContent && (
                          <p className="text-gray-600 text-sm">
                            <span className="font-semibold">Text:</span> &quot;
                            {step.textContent.substring(0, 100)}
                            {step.textContent.length > 100 ? "..." : ""}&quot;
                          </p>
                        )}

                        {step.value && (
                          <p className="text-gray-600 text-sm">
                            <span className="font-semibold">Value:</span> &quot;
                            {step.value}&quot;
                          </p>
                        )}

                        {step.formData && (
                          <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                            <p className="text-yellow-800 text-xs font-semibold mb-1">
                              Form Data:
                            </p>
                            <div className="text-xs text-yellow-700 space-y-1">
                              {step.formData.type && (
                                <div>Type: {step.formData.type}</div>
                              )}
                              {step.formData.placeholder && (
                                <div>
                                  Placeholder: {step.formData.placeholder}
                                </div>
                              )}
                              {step.formData.required && (
                                <div>Required: Yes</div>
                              )}
                              {step.formData.disabled && (
                                <div>Disabled: Yes</div>
                              )}
                              {step.formData.checked !== undefined && (
                                <div>
                                  Checked:{" "}
                                  {step.formData.checked ? "Yes" : "No"}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div>
                            Position: {Math.round(step.position.x)},{" "}
                            {Math.round(step.position.y)}
                          </div>
                          <div>
                            Size: {Math.round(step.position.width)} ×{" "}
                            {Math.round(step.position.height)}
                          </div>
                        </div>

                        {step.accessibility?.ariaLabel && (
                          <p className="text-gray-600 text-xs">
                            <span className="font-semibold">ARIA Label:</span>{" "}
                            {step.accessibility.ariaLabel}
                          </p>
                        )}

                        <p className="text-gray-500 text-xs truncate">
                          {step.url}
                        </p>

                        {/* DEBUG: Show raw data */}
                        <details className="mt-2">
                          <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
                            🔍 Debug: Show Raw Data
                          </summary>
                          <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
                            {JSON.stringify(step, null, 2)}
                          </pre>
                        </details>
                      </div>
                    </div>

                    <div className="text-right text-xs text-gray-500">
                      {new Date(step.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API Status */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            API Endpoint:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              POST /api/Buildtour
            </code>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Data updates every 2 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
