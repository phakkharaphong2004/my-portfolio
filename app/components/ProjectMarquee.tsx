"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { T, useTr } from "./LangProvider";

// ดึง video id จากลิงก์ YouTube ได้ทุกแบบ (watch?v= / youtu.be / shorts / embed)
function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

function VideoSlide({
  id,
  title,
  onPlay,
  onStop,
}: {
  id: string;
  title: string;
  onPlay: () => void;
  onStop: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const tr = useTr();

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setPlaying(true);
        onPlay();
      }}
      aria-label={`${tr({ th: "เล่นวิดีโอ", en: "Play video", zh: "播放视频" })} ${title}`}
      className="group absolute inset-0 h-full w-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        draggable={false}
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/10" />
      <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white shadow-[0_0_24px_rgba(139,92,246,0.6)] transition group-hover:scale-110">
        <Play className="h-6 w-6 translate-x-0.5 fill-white" />
      </span>
    </button>
  );
}

export default function ProjectMarquee({
  images,
  alt,
  duration = 30,
  reverse = false,
}: {
  images: string[]; // ใส่ได้ทั้งรูป ("/projects/a.png") และลิงก์ YouTube
  alt: string;
  duration?: number;
  reverse?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false); // มีวิดีโอกำลังเล่นอยู่
  const tr = useTr();

  const slides: (string | null)[] =
    images.length > 0 ? images : [null, null, null];
  const loop = [...slides, ...slides];

  const paused = hovered || videoOpen;

  return (
    <div
      className="relative h-[340px] w-full overflow-hidden bg-[#12141d] md:h-full md:min-h-[340px]"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
        maskImage:
          "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="marquee-track-y absolute inset-x-0 top-0 flex w-full flex-col items-center px-6"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {loop.map((src, i) => {
          const ytId = src ? getYouTubeId(src) : null;
          return (
            <div
              key={i}
              aria-hidden={i >= slides.length}
              className="relative mb-4 aspect-video w-full max-w-sm shrink-0 overflow-hidden rounded-xl border border-[#202530] bg-[#12141d] transition-colors duration-300 hover:border-[#8B5CF6]/60"
            >
              {ytId ? (
                <VideoSlide
                  id={ytId}
                  title={`${alt} ${tr({ th: "วิดีโอ", en: "video", zh: "视频" })}`}
                  onPlay={() => setVideoOpen(true)}
                  onStop={() => setVideoOpen(false)}
                />
              ) : src ? (
                <Image
                  src={src}
                  alt={`${alt} ${(i % slides.length) + 1}`}
                  fill
                  sizes="384px"
                  draggable={false}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/5">
                  <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-[#8B5CF6]/25 border-t-[#a78bfa]" />
                  <span className="text-xs text-[#F8FAFC]/60">
                    <T
                      v={{
                        th: "รออัปเดตภาพ",
                        en: "Images coming soon",
                        zh: "图片即将更新",
                      }}
                    />
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}