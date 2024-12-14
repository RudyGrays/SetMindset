import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

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

  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack | undefined>(
    () => {
      const vidTrack = stream?.getVideoTracks()[0];
      if (vidTrack) {
        vidTrack.enabled = !vidTrack.enabled;
      }

      return vidTrack;
    }
  );
  const [audioTrack, setAudioTrack] = useState<MediaStreamTrack | undefined>(
    () => {
      const micTrack = stream?.getAudioTracks()[0];
      if (micTrack) {
        micTrack.enabled = !micTrack.enabled;
      }

      return micTrack;
    }
  );

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleCamera = () => {
    if (stream && videoTrack) {
      const newVideoTrack: MediaStreamTrack = videoTrack;
      newVideoTrack.enabled = !videoTrack.enabled;

      setVideoTrack(newVideoTrack);
    }
  };

  const toggleMicro = () => {
    if (stream && audioTrack) {
      const newAudioTrack: MediaStreamTrack = audioTrack;
      newAudioTrack.enabled = !audioTrack.enabled;

      setAudioTrack(newAudioTrack);
    }
  };

  return (
    <div className="relative max-w-full max-h-full">
      <video
        ref={videoRef}
        className="rounded border"
        autoPlay
        playsInline
        muted={isLocalStream}
      />
      <div
        className="absolute cursor-pointer top-3 left-4"
        onClick={toggleCamera}
      >
        {videoTrack?.enabled ? <Video /> : <VideoOff />}
      </div>
      <div
        className="absolute cursor-pointer top-3 left-14"
        onClick={toggleMicro}
      >
        {audioTrack?.enabled ? <Mic /> : <MicOff />}
      </div>
      <div className="absolute cursor-pointer top-3 left-24" onClick={() => {}}>
        <PhoneOff />
      </div>
    </div>
  );
};
