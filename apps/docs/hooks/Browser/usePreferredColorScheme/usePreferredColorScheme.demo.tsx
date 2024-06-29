'use client';

import { usePreferredColorScheme } from './usePreferredColorScheme';

function PreferredColorSchemeDemo() {
  const preferredColorScheme = usePreferredColorScheme();

  return (
    <div
      className={`min-h-screen ${preferredColorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div
          className={`rounded-lg p-6 ${preferredColorScheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        >
          <h2 className="mb-4 text-2xl font-semibold">Current Color Scheme</h2>
          <p className="text-lg">
            The user&apos;s preferred color scheme is:{' '}
            <span className="font-bold">{preferredColorScheme}</span>
          </p>
        </div>
        <div className="mt-8">
          <p className="text-lg">
            Try changing your system&apos;s color scheme preference and observe
            how the demo updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreferredColorSchemeDemo;
