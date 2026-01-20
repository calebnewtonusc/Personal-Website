import { useEffect } from 'react';

const useImagePreloader = (imageUrls) => {
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);
};

export default useImagePreloader;
