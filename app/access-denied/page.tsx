// app/access-denied/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccessDenied() {
  const router = useRouter();

  useEffect(() => {
    // Check if the page was refreshed
    const isRefreshed = sessionStorage.getItem('accessDeniedRefreshed');
    if (isRefreshed) {
      sessionStorage.removeItem('accessDeniedRefreshed'); // Clear flag
      router.push('/'); // Redirect to landing page
    } else {
      // Set flag on first load
      sessionStorage.setItem('accessDeniedRefreshed', 'true');
    }

    // Cleanup on unmount
    return () => {
      sessionStorage.removeItem('accessDeniedRefreshed');
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark">
      <div className="access-denied-container w-full h-screen">
        <video
          id="loop-video"
          loop
          muted
          autoPlay
          className="w-full h-screen object-cover"
          onError={(e) => {
            const video = e.currentTarget as HTMLVideoElement;
            const error = video.error;
            console.error('Video playback error:', {
              code: error?.code || 'Unknown',
              message: error?.message || 'No error message provided',
              src: video.currentSrc || 'Unknown source',
              target: e.currentTarget,
            });
          }}
          onLoadedData={() => console.log('Video loaded successfully')}
          onCanPlay={() => console.log('Video can play')}
          onPlay={() => console.log('Video is playing')}
        >
          <source src="/assets/videos/AccessDenied.mp4" type="video/mp4" />
          <source src="/assets/videos/AccessDenied.mov" type="video/quicktime" />
          <p>Access Denied: Your browser does not support this video.</p>
        </video>
      </div>
    </div>
  );
}