import { useReadFiles } from '../hooks/useData';

export const heroSlides = () => {
  const path = 'images/hero';
  const data = useReadFiles(path);
  
  // Check if data is still being fetched
  if(!data) {
    return [];
  }
  
  if(data) {
    const imgArr = data.map((src: string, index: number) => ({
      src,
      alt: `Hero Image ${index + 1}`,
    }));
    return imgArr;
  }
};

export const gallerySlides = () => {
  const path = 'images/slides';
  const data = useReadFiles(path);
  
  // Check if data is still being fetched
  if(!data) {
    return [];
  }
  
  if(data) {
    const imgArr = data.map((src: string, index: number) => ({
      src,
      alt: `Gallery Image ${index + 1}`,
    }));
    return imgArr;
  }
};