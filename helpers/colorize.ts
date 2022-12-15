import { FC, ReactNode } from "react";

const isImageBright = (
  imgSrc: string,
) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Load the image into the canvas
  const img = new Image();
  img.src = './my-image.jpg';
  img.onload = () => {
    ctx.drawImage(img, 0, 0);

    // Extract the pixel data from the image
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Calculate the average brightness of the pixels
    let sum = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      // The red, green, and blue values are stored in the first three elements of each pixel
      // We can calculate the brightness by taking the average of these three values
      const brightness = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      sum += brightness;
    }
    const averageBrightness = sum / (imageData.data.length / 4);

    // Determine if the image is dark or light
    if (averageBrightness > 128) {
      return true;
    } else {
      return false;
    }
  };
}

interface Props {
  check: ('isImageBright' | 'makeCool')[];
  img?: {
    src?: string,
  };
}
export const imageHelper: FC<Props> = ({ check, img }): any => {
  let output = []
  if(check.includes('isImageBright')) {
    output.push(isImageBright(img.src));
  }
  if(check.includes('makeCool')) {
    output.push('cool')
  }
  return output;
}