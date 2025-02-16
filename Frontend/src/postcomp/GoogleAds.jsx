import React from 'react';
import { GoogleAds } from 'react-google-ads';

const GoogleAdsComponent = () => {
  return (
    <GoogleAds
      client="ca-pub-xxxxxxxxxx"
      slot="xxxxxxxxxx"
      format="auto"
      responsive="true"
    />
  );
};

export default GoogleAdsComponent;



// import React, { useEffect } from 'react';

// // const GoogleAdsComponent = () => {
// //   useEffect(() => {
// //     const script = document.createElement('script');
// //     script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
// //     script.async = true;
// //     script.crossOrigin = 'anonymous';
// //     document.body.appendChild(script);

// //     (window.adsbygoogle = window.adsbygoogle || []).push({});
// //   }, []);

// //   return (
// //     <ins className="adsbygoogle"
// //       style={{ display: 'block' }}
// //       data-ad-client="ca-pub-xxxxxxxxxx"
// //       data-ad-slot="xxxxxxxxxx"
// //       data-ad-format="auto"
// //       data-full-width-responsive="true"></ins>
// //   );
// // };

// // export default GoogleAdsComponent;