'use client';

import { Button } from '@/components/ui/button';
import { useShare } from './useShare';

function ShareDemo() {
  const { isSupported, share } = useShare({
    title: 'Check out this article',
    url: 'https://www.example.com/article',
    files: [],
  });

  const handleShare = () => {
    share({
      text: 'This is a great article!',
      files: [],
    });
  };

  return (
    <div className="mt-10 p-6">
      <p className="mb-4">
        {isSupported
          ? 'Web Share API is supported in this browser.'
          : 'Web Share API is not supported in this browser.'}
      </p>
      {isSupported ? <Button onClick={handleShare}>Share</Button> : null}
    </div>
  );
}

export default ShareDemo;
