import { useEffect, useRef } from 'react';

type Props = Record<string, any>;

function useWhyDidYouUpdate(componentName: string, props: Props) {
  const prevProps = useRef<Props>({});

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changesObj: Record<string, { from: any; to: any }> = {};

      allKeys.forEach((key) => {
        if (prevProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', componentName, changesObj);
      }
    }

    prevProps.current = props;
  });
}

export default useWhyDidYouUpdate;
