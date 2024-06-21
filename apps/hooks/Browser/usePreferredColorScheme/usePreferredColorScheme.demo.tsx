'use client';

import { usePreferredColorScheme } from './usePreferredColorScheme';

const PreferredColorSchemeDemo = () => {
  const preferredColorScheme = usePreferredColorScheme();

  return (
    <div
      className={`min-h-screen ${preferredColorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div
          className={`p-6 rounded-lg ${preferredColorScheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        >
          <h2 className="text-2xl font-semibold mb-4">Current Color Scheme</h2>
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
};

export default PreferredColorSchemeDemo;
