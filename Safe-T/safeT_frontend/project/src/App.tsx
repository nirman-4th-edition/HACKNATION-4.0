// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from 'react';
import { FactorySection } from './components/FactorySection';
import { HealthSection } from './components/HealthSection';
import { ThemeToggle } from './components/ThemeToggle';
import { WorkerMonitoring } from './components/worker/WorkerMonitoring';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <nav className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/30 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Factory Dashboard</h1>
                <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <FactorySection />
              </div>
              <div className="lg:col-span-2">
                <HealthSection />
                <div className="mt-8">
                  <WorkerMonitoring />
                </div>
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
  );
}

export default App;