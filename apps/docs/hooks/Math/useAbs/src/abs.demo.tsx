import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, AlertCircle, RefreshCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAbs } from './abs';

export const AbsDemo = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const getAbsoluteValue = useAbs(
    useCallback(() => {
      const num = Number(inputValue);
      if (isNaN(num)) {
        throw new Error('Please enter a valid number');
      }
      return num;
    }, [inputValue]),
  );

  const handleCalculate = () => {
    setError('');
    try {
      if (typeof getAbsoluteValue === 'function') {
        getAbsoluteValue();
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleReset = () => {
    setInputValue('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Absolute Value
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a number..."
              className="flex-1"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleCalculate} variant="default">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Calculate absolute value</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleReset} variant="outline">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset calculator</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {error && (
            <Alert variant="destructive" className="flex items-center">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!error && inputValue !== '' && (
            <Alert>
              <AlertDescription className="flex items-center">
                <span>Absolute value of {inputValue}:&nbsp;</span>
                <strong className="underline">
                  {typeof getAbsoluteValue === 'function'
                    ? getAbsoluteValue()
                    : getAbsoluteValue}
                </strong>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
