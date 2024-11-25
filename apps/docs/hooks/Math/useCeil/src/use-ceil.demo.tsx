import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import useCeil from './use-ceil';

export const CeilDemo = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [power, setPower] = useState<string>('0');
  const [precision, setPrecision] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [type, setType] = useState<'number' | 'bigint'>('number');
  const [isCalculating, setIsCalculating] = useState(false);

  const [value, setValue] = useCeil(
    type === 'number' ? Number(inputValue) || 0 : BigInt(Math.floor(Number(inputValue)) || 0),
    {
      power: Number(power),
      precision: precision ? Number(precision) : undefined,
    }
  );

  const handleCalculate = () => {
    setError('');
    setIsCalculating(true);
    try {
      if (!inputValue.trim()) {
        throw new Error('Input value is required');
      }

      if (type === 'bigint') {
        if (inputValue.includes('.')) {
          throw new Error('BigInt values must be integers without decimal points');
        }
        if (!/^-?\d+$/.test(inputValue)) {
          throw new Error('BigInt values must contain only digits');
        }
        setValue(BigInt(inputValue));
      } else {
        const num = Number(inputValue);
        if (Number.isNaN(num)) {
          throw new Error('Input must be a valid number');
        }
        setValue(num);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInputValue('');
    setPower('0');
    setPrecision('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCalculate();
    }
  };

  const powerOptions = Array.from({ length: 5 }, (_, i) => i.toString());
  const precisionOptions = Array.from({ length: 6 }, (_, i) => i.toString());

  return (
    <TooltipProvider>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Ceiling Value Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={type}
              onValueChange={(value: 'number' | 'bigint') => {
                setType(value);
                handleReset();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="bigint">BigInt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={type === 'number' ? "Enter a number..." : "Enter an integer..."}
                className="flex-1"
                aria-label={type === 'number' ? "Number input" : "BigInt input"}
                aria-invalid={!!error}
                aria-describedby={error ? "error-message" : undefined}
                disabled={isCalculating}
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleCalculate} variant="default">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Calculate ceiling value</p>
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

          {type === 'number' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Power</Label>
                <Select
                  value={power}
                  onValueChange={setPower}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select power" />
                  </SelectTrigger>
                  <SelectContent>
                    {powerOptions.map((p) => (
                      <SelectItem key={p} value={p}>
                        10^{p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Precision</Label>
                <Select
                  value={precision}
                  onValueChange={setPrecision}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select precision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {precisionOptions.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p} decimal{Number(p) !== 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="flex items-center" id="error-message" role="alert">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2">{error}</AlertDescription>
            </Alert>
          )}

          {!error && inputValue !== '' && (
            <Alert>
              <AlertDescription className="flex items-center space-x-2">
                <span className="font-medium">Input:</span>
                <span>{inputValue}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">Result:</span>
                <span>{isCalculating ? 'Calculating...' : value.toString()}</span>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
