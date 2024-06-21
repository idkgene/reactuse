'use client';

import { useScrollPosition } from './useWindowScroll';

export default function ScrollPositionDemo() {
  const { x, y } = useScrollPosition();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="h-64 overflow-y-scroll bg-gray-700 rounded-lg p-4">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Section 1</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, nec
              aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl
              sit amet nisl.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Section 2</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, nec
              aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl
              sit amet nisl.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Section 3</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, nec
              aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl
              sit amet nisl.
            </p>
          </section>
        </div>
        <div className="mt-4 text-lg">
          Scroll Position: ({x}, {y})
        </div>
      </div>
    </div>
  );
}
