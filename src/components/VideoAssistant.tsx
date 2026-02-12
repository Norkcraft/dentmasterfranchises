import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Wrench, Award, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Player from "@vimeo/player";

interface VideoAssistantProps {
  onChoose: (choice: "quote" | "training") => void;
}

const videoIds = {
  intro: 1164392249,
  quote: 1164392384,
  training: 1164392428,
};

export default function VideoAssistant({ onChoose }: VideoAssistantProps) {
  const { t } = useLanguage();
  const [choice, setChoice] = useState<null | "quote" | "training">(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  const currentId = choice === "quote" ? videoIds.quote : choice === "training" ? videoIds.training : videoIds.intro;

  // Create / recreate player when video id changes
  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy old player
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    setPlaying(false);
    setMuted(true);

    const player = new Player(containerRef.current, {
      id: currentId,
      dnt: true,
      title: false,
      byline: false,
      portrait: false,
      loop: true,
      autopause: false,
      controls: false,
      muted: true,
      responsive: true,
    });

    player.on("play", () => setPlaying(true));
    player.on("pause", () => setPlaying(false));

    playerRef.current = player;

    return () => {
      player.destroy();
    };
  }, [currentId]);

  const handlePlay = useCallback(() => {
    playerRef.current?.play();
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      playerRef.current?.setVolume(next ? 0 : 1);
      return next;
    });
  }, []);

  const handleChoice = (c: "quote" | "training") => {
    setChoice(c);
    onChoose(c);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-border bg-card">
      {/* Portrait video container */}
      <div className="relative" style={{ aspectRatio: "9 / 16", maxHeight: "600px" }}>
        {/* Vimeo player mounts here */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full [&>iframe]:!w-full [&>iframe]:!h-full [&>iframe]:!absolute [&>iframe]:!inset-0" />

        {/* Play button overlay — shows when not playing */}
        {!playing && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity hover:bg-black/30"
            aria-label={t("Play video", "Reproducir video")}
          >
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-110 transition-transform">
              <Play className="w-9 h-9 text-primary-foreground ml-1" fill="currentColor" />
            </div>
            <span className="mt-4 text-white text-sm font-medium">
              {t("Tap to Play", "Toca para Reproducir")}
            </span>
          </button>
        )}

        {/* Mute/Sound toggle — only visible when playing */}
        {playing && (
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-sm px-3 py-2 text-white hover:bg-black/80 transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span className="text-xs font-medium">
              {muted ? t("Tap for Sound", "Activar Sonido") : t("Mute", "Silenciar")}
            </span>
          </button>
        )}

        {/* Bottom overlay with gradient + action buttons */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-6 px-5">
            <p className="text-white/80 text-sm mb-4 text-center font-medium">
              {t("How can we help you today?", "¿Cómo podemos ayudarle hoy?")}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleChoice("quote")}
                className={`flex items-center gap-3 w-full rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition-all duration-300 ${
                  choice === "quote"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/10"
                }`}
              >
                <Wrench className="w-5 h-5 shrink-0" />
                {t("I Need a Dent Repaired", "Necesito Reparar una Abolladura")}
              </button>
              <button
                onClick={() => handleChoice("training")}
                className={`flex items-center gap-3 w-full rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition-all duration-300 ${
                  choice === "training"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/10"
                }`}
              >
                <Award className="w-5 h-5 shrink-0" />
                {t("I Want to Learn PDR", "Quiero Aprender PDR")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
