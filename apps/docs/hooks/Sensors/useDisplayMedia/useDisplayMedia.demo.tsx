'use client';
import { useEffect, useState } from 'react';
import { useDisplayMedia } from './useDisplayMedia';

function DisplayMediaDemo() {
  const { isSupported, stream, start, stop, enabled } = useDisplayMedia({
    video: true,
    audio: false,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!isSupported) {
    return <div>getDisplayMedia is not supported in this environment.</div>;
  }

  return (
    <div>
      <div>
        <button onClick={start} disabled={enabled}>
          Start Screen Sharing
        </button>
        <button onClick={stop} disabled={!enabled}>
          Stop Screen Sharing
        </button>
      </div>
      {stream ? <div>
          <video
            ref={(videoRef) => {
              if (videoRef) {
                videoRef.srcObject = stream;
              }
            }}
            autoPlay
          />
        </div> : null}
    </div>
  );
}

export default DisplayMediaDemo;
