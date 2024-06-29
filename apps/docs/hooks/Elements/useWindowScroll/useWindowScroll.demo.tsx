'use client';

import { useScrollPosition } from './useWindowScroll';

export default function ScrollPositionDemo() {
  const { x, y } = useScrollPosition();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl rounded-lg bg-gray-800 p-6 shadow-lg">
        <div className="h-64 overflow-y-scroll rounded-lg bg-gray-700 p-4">
          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-bold">Section 1</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, nec
              aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl
              sit amet nisl.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-bold">Section 2</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, nec
              aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl
              sit amet nisl.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-bold">Section 3</h2>
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
