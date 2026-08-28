"use client";

import Image from "next/image";
import type { MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ScrollVideoProps = {
  progress: MotionValue<number>;
  src: string;
  poster: string;
  priority?: boolean;
  className?: string;
};

export function ScrollVideo({ progress, src, poster, priority = false, className = "" }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const progressRef = useRef(progress.get());
  const displayTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const video: HTMLVideoElement = videoElement;

    function stopFrame() {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }

    function tick() {
      if (!video.duration || !Number.isFinite(video.duration)) {
        frameRef.current = null;
        return;
      }

      const difference = targetTimeRef.current - displayTimeRef.current;
      displayTimeRef.current += difference * 0.2;

      if (!video.seeking && Math.abs(video.currentTime - displayTimeRef.current) > 0.018) {
        video.currentTime = displayTimeRef.current;
      }

      if (Math.abs(difference) > 0.004 || video.seeking) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    }

    function scheduleFrame() {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(tick);
    }

    function updateTarget(value: number) {
      progressRef.current = Math.min(1, Math.max(0, value));
      if (!video.duration || !Number.isFinite(video.duration)) return;
      targetTimeRef.current = progressRef.current * Math.max(0, video.duration - 0.04);
      scheduleFrame();
    }

    function handleMetadata() {
      targetTimeRef.current = progressRef.current * Math.max(0, video.duration - 0.04);
      displayTimeRef.current = targetTimeRef.current;
      video.currentTime = targetTimeRef.current;
      scheduleFrame();
    }

    function handleReady() {
      setReady(true);
      scheduleFrame();
    }

    const unsubscribe = progress.on("change", updateTarget);
    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("seeked", scheduleFrame);

    if (video.readyState >= 1) handleMetadata();
    if (video.readyState >= 2) handleReady();

    return () => {
      unsubscribe();
      stopFrame();
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("seeked", scheduleFrame);
    };
  }, [progress]);

  return (
    <div className={`scroll-video ${className}`} data-ready={ready}>
      <Image
        className="scroll-video__poster"
        src={poster}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        className="scroll-video__video"
        muted
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={src} type="video/mp4" media="(min-width: 769px)" />
      </video>
    </div>
  );
}
