import React, { useEffect } from "react";

const AdComponent: React.FC = () => {
  useEffect(() => {
    // Initialize Google AdSense
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3672394855794259"
        data-ad-slot="1234567890" /* Replace with your AdSense ad slot ID */
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdComponent;