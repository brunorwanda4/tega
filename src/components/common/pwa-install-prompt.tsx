'use client';

import { useInstallPrompt } from '@/lib/pwa/install-prompt';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function PWAInstallPrompt() {
  const { canInstall, isAppInstalled, promptInstall } = useInstallPrompt();

  // Don't show anything if already installed
  if (isAppInstalled) {
    return (
      <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-green-900 dark:text-green-100">
              App Installed
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Tega is installed and ready to use offline!
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Show install prompt if available
  if (canInstall) {
    return (
      <Card className="p-6 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Install Tega App
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Install Tega on your device for faster access, offline support, and a native app experience.
            </p>
          </div>
          <Button
            onClick={promptInstall}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Install Now
          </Button>
        </div>
      </Card>
    );
  }

  // Show general PWA info for browsers that don't support install prompt (like iOS Safari)
  return (
    <Card className="p-6 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="shrink-0">
          <div className="w-12 h-12 bg-gray-600 dark:bg-gray-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Use Tega as an App
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
            Add Tega to your home screen for quick access and offline support.
          </p>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-medium">On iOS (Safari):</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Tap the Share button</li>
              <li>Scroll down and tap "Add to Home Screen"</li>
              <li>Tap "Add" to confirm</li>
            </ol>
            <p className="font-medium mt-3">On Android (Chrome):</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Tap the menu (three dots)</li>
              <li>Tap "Add to Home screen"</li>
              <li>Tap "Add" to confirm</li>
            </ol>
          </div>
        </div>
      </div>
    </Card>
  );
}
