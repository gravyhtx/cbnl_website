import { ReactNode } from "react";
// https://www.digitalocean.com/community/tutorials/front-and-rear-camera-access-with-javascripts-getusermedia#step-5-displaying-the-video-stream-on-the-browser

// GRANT ACCESS TO DEVICE VIDEO OR AUDIO FOR STREAMING
export const grantStreamAccess = async(
  type: 'audio' | 'video'
) => {
  navigator.mediaDevices.getUserMedia(type === 'video' ? {video: true} : {audio: true});
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices;
}

// SELECT VIDEO INPUT FOR STREAMING
export const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  const options = videoDevices.map(stream => {
    return { id: stream.deviceId, label: stream.label }
  });
  return options;
};

// SCREENSHOT VIDEO STREAM
export const screenShotVideo = (
  videoElement: HTMLVideoElement,
  canvasElement: HTMLCanvasElement,
  screenShotImage: HTMLImageElement,
) => {
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  canvasElement.getContext('2d').drawImage(videoElement, 0, 0);
  screenShotImage.src = canvasElement.toDataURL('image/webp');
}

// USE CAMERA FOR VIDEO STREAMING
export const useVideoStream = (
  videoElement: HTMLVideoElement, // <video>
  canvasElement: HTMLCanvasElement, // <canvas>
  screenShotImage: HTMLImageElement, // <img>
  constraints?: {
    width?: ConstrainDoubleRange, // min, ideal, max
    height?: ConstrainDoubleRange,
  },
  isPlaying?: boolean, // two-way prop for playing video
  isStreaming?: boolean | undefined, // check if streaming in progress
  cameraSelectionId?: string, // id of selected camera
) => {

  let streamStarted = false;
  isStreaming = isStreaming === undefined ? false : streamStarted;

  const w = constraints.width;
  const h = constraints.height;

  const display = {
    video: {
      width: { min: w.min ? w.min : 1280, ideal: w.ideal ? w.ideal : 1920, max: w.max ? w.max : 2560, },
      height: { min: h.min ? h.min : 720, ideal: h.ideal ? h.ideal : 1080, max: h.max ? h.min : 1440 },
    }
  };

  const handleStream = (stream: any) => {
    streamStarted = true;
    videoElement.srcObject = stream;
  };

  const startStream = async (constraints: MediaStreamConstraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleStream(stream);
  };

  if (isPlaying) {
    if (streamStarted) {
      videoElement.play();
    }
    if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
      const updatedConstraints = {
        ...display,
        deviceId: {
          exact: cameraSelectionId,
        },
      };
      startStream(updatedConstraints);
    }
  }

  const playStream = () => {
    isPlaying = true;
    videoElement.play();
  };

  const pauseStream = () => {
    isPlaying = false;
    videoElement.pause();
  };

  return {
    play: playStream(),
    pause: pauseStream(),
    screenshot: screenShotVideo(videoElement, canvasElement, screenShotImage)
  }

}