import { FC, useEffect, useRef } from "react";

interface VideoContainerProps {
  stream?: MediaStream;
  isLocalStream: boolean;
  isOnCall: boolean;
}

export const VideoContainer: FC<VideoContainerProps> = ({
  stream,
  isLocalStream,
  isOnCall,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      className="rounded border w-full h-full"
      autoPlay
      playsInline
      muted={isLocalStream}
    />
  );
};
