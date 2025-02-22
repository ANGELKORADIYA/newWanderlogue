import React, { useEffect } from 'react';

const GoogleAdsComponent = () => {
  useEffect(() => {
    // Wait for the page to load before loading the ads script
    window.onload = () => {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8903937759165446';
      document.head.appendChild(script);

      // Initialize ads after script loads
      script.onload = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error('Ad loading error:', err);
        }
      };
    };

    return () => {
      // Cleanup on unmount
      const script = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', width: '100%', height: 'auto', minHeight: '280px' }}
      data-ad-client="ca-pub-8903937759165446"
      data-ad-slot="6817945399"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAdsComponent;