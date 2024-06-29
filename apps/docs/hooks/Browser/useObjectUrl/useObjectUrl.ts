import { useEffect, useState } from 'react';

type ObjectType = File | Blob | MediaSource | null | undefined;

export function useObjectUrl(
  object: ObjectType | (() => ObjectType),
): string | undefined {
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    const obj = typeof object === 'function' ? object() : object;

    if (obj) {
      const objectUrl = URL.createObjectURL(obj);
      setUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } 
      setUrl(undefined);
    
  }, [object]);

  return url;
}
