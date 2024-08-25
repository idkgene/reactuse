'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls,  } from '@react-three/drei';
import { useVector, type Vector3D } from './use-vector';
import { VectorArrow } from './vector-arrow';
import { CustomAxis } from './custom-axis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

function VectorDemo(): JSX.Element {
  const {
    vector: firstVector,
    setVector: setFirstVector,
    add,
    subtract,
    scale,
    normalize,
    dot,
    cross,
    project,
    magnitude,
    isZero,
    unit,
  } = useVector([3, 4, 2]);

  const [secondVector, setSecondVector] = useState<Vector3D>([1, 2, 1]);
  const [scalarValue, setScalarValue] = useState<number>(1);

  const handleOperation = (
    operation: 'add' | 'subtract' | 'cross' | 'project',
  ): void => {
    let result: Vector3D;

    switch (operation) {
      case 'add':
        result = add(secondVector);
        break;
      case 'subtract':
        result = subtract(secondVector);
        break;
      case 'cross':
        result = cross(secondVector);
        break;
      case 'project':
        result = project(secondVector);
        break;
      default:
        throw new Error(`Unsupported operation: ${String(operation)}`);
    }

    setFirstVector(result);
  };

  const handleScale = (): void => {
    const result = scale(scalarValue);
    setFirstVector(result);
  };

  const handleNormalize = (): void => {
    try {
      const result = normalize();
      setFirstVector(result);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDot = (): void => {
    const result = dot(secondVector);
    alert(`Dot product: ${result}`);
  };

  const updateVector =
    (setVectorFunction: React.Dispatch<React.SetStateAction<Vector3D>>) =>
    (index: number, value: number) => {
      setVectorFunction((prev) => {
        const newVector = [...prev];
        newVector[index] = value;
        return newVector as Vector3D;
      });
    };

  const updateSecondVector = updateVector(setSecondVector);

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>3D Vector Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '400px' }}>
            <Canvas camera={{ position: [5, 5, 5] }}>
              <OrbitControls />
              <CustomAxis start={[0, 0, 0]} end={[5, 0, 0]} color="red" />
              <CustomAxis start={[0, 0, 0]} end={[0, 5, 0]} color="green" />
              <CustomAxis start={[0, 0, 0]} end={[0, 0, 5]} color="blue" />
              <VectorArrow start={[0, 0, 0]} end={firstVector} color="purple" />
              <VectorArrow
                start={[0, 0, 0]}
                end={secondVector}
                color="orange"
              />
              <gridHelper args={[10, 10]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
            </Canvas>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vector Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => {
                handleOperation('add');
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                handleOperation('subtract');
              }}
            >
              Subtract
            </Button>
            <Button onClick={handleScale}>Scale</Button>
            <Button onClick={handleNormalize}>Normalize</Button>
            <Button onClick={handleDot}>Dot Product</Button>
            <Button
              onClick={() => {
                handleOperation('cross');
              }}
            >
              Cross Product
            </Button>
            <Button
              onClick={() => {
                handleOperation('project');
              }}
            >
              Project
            </Button>
          </div>
          <div className="mt-4">
            <Label>First Vector</Label>
            <div className="grid grid-cols-3 gap-2">
              {['X', 'Y', 'Z'].map((axis, index) => (
                <div key={axis}>
                  <Label>{axis}</Label>
                  <Input
                    type="number"
                    value={firstVector[index].toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      updateVector(index, value === '' ? 0 : parseFloat(value));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Label>Second Vector</Label>
            <div className="grid grid-cols-3 gap-2">
              {['X', 'Y', 'Z'].map((axis, index) => (
                <div key={axis}>
                  <Label>{axis}</Label>
                  <Input
                    type="number"
                    value={secondVector[index].toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      updateSecondVector(
                        index,
                        value === '' ? 0 : parseFloat(value),
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <Label>Scalar Value</Label>
            <Slider
              value={[scalarValue]}
              onValueChange={(value: number[]) => {
                setScalarValue(value[0]);
              }}
              min={0}
              max={5}
              step={0.1}
            />
            <span>{scalarValue.toFixed(1)}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vector Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              Current Vector: [{firstVector.map((v) => v.toFixed(2)).join(', ')}
              ]
            </p>
            <p>Magnitude: {magnitude.toFixed(2)}</p>
            <p>Is Zero Vector: {isZero.toString()}</p>
            <p>Unit Vector: [{unit.map((v) => v.toFixed(2)).join(', ')}]</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VectorDemo;
