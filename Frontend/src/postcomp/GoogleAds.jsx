import React, { useEffect } from 'react';

const GoogleAdsComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.ampproject.org/v0.js';
    document.head.appendChild(script);
  }, []);

  return (
    <amp-ad
      width="100vw"
      height="320"
      type="adsense"
      data-ad-client="ca-pub-8903937759165446"
      data-ad-slot="6817945399"
      data-auto-format="rspv"
      data-full-width=""
    >
      <div overflow=""></div>
    </amp-ad>
  );
};

export default GoogleAdsComponent;