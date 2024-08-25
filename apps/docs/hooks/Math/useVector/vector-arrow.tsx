'use client';

import React, { useRef, useMemo, createElement } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

interface VectorArrowProps {
  start: [number, number, number];
  end: [number, number, number];
  color: THREE.ColorRepresentation;
}

function VectorArrow({ start, end, color }: VectorArrowProps): JSX.Element {
  const ref = useRef<THREE.ArrowHelper>(null);

  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  const direction = useMemo(() => {
    return new THREE.Vector3().subVectors(endVec, startVec).normalize();
  }, [startVec, endVec]);

  const length = useMemo(() => startVec.distanceTo(endVec), [startVec, endVec]);

  useFrame(() => {
    if (ref.current) {
      ref.current.setDirection(direction);
      ref.current.position.copy(startVec);
      ref.current.setLength(length, 0.2 * length, 0.1 * length);
    }
  });

  return (
    <group>
      {createElement('arrowHelper', {
        ref,
        args: [direction, startVec, length, color, 0.2 * length, 0.1 * length],
      })}
      <Line points={[startVec, endVec]} color={color} lineWidth={3} />
    </group>
  );
}

export { VectorArrow };
