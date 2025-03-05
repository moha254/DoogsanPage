import React, { useEffect, useRef } from 'react';

interface QRCodeProps {
  url: string;
  size?: number;
}

const QRCode: React.FC<QRCodeProps> = ({ url, size = 150 }) => {
  const qrContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadQRCode = async () => {
      try {
        // Generate QR code URL using QR code API
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
        
        if (qrContainerRef.current) {
          const img = document.createElement('img');
          img.src = qrCodeUrl;
          img.alt = 'QR Code';
          img.className = 'mx-auto';
          img.width = size;
          img.height = size;
          
          // Clear previous content and append the new QR code
          qrContainerRef.current.innerHTML = '';
          qrContainerRef.current.appendChild(img);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    loadQRCode();
  }, [url, size]);

  return (
    <div ref={qrContainerRef} className="qr-code-container bg-white p-2 inline-block rounded-md">
      {/* QR code will be inserted here */}
    </div>
  );
};

export default QRCode;