import { useEffect } from "react";

// Declare the adsbygoogle global object for TypeScript
declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdComponent = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3672394855794259" // Replace with your AdSense publisher ID
      data-ad-slot="1234567890" // Replace with your AdSense ad slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdComponent;