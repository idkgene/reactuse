'use client';

import React, { useMemo } from 'react';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';


extend({ Line_: THREE.Line });

type Vector3Tuple = [number, number, number];

interface CustomAxisProps {
  start: Vector3Tuple;
  end: Vector3Tuple;
  color: THREE.ColorRepresentation;
}

function CustomAxis({ start, end, color }: CustomAxisProps): JSX.Element {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  return <Line points={points} color={color} lineWidth={2} />;
}

export { CustomAxis }