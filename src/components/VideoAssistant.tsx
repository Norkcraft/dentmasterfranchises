import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Wrench, Award, Play, Pause, SkipForward, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Player from "@vimeo/player";

interface VideoAssistantProps {
  onChoose: (choice: "quote" | "training") => void;
  onContinue: (choice: "quote" | "training") => void;
}

const videoIds = {
  intro: 1164392249,
  quote: 1164392384,
  training: 1164392428,
};

type Phase = "intro" | "watching" | "ready";

export default function VideoAssistant({ onChoose, onContinue }: VideoAssistantProps) {
  const { t } = useLanguage();
  const [choice, setChoice] = useState<null | "quote" | "training">(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  const currentId = choice === "quote" ? videoIds.quote : choice === "training" ? videoIds.training : videoIds.intro;

  // Create / recreate player when video id changes
  useEffect(() => {
    if (!containerRef.current) return;

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
    player.on("ended", () => {
      if (phase === "watching") setPhase("ready");
    });

    playerRef.current = player;

    // Auto-play the branch video after switching
    if (phase === "watching") {
      player.ready().then(() => player.play()).catch(() => {});
    }

    return () => { player.destroy(); };
  }, [currentId]);

  const handlePlay = useCallback(() => {
    playerRef.current?.play();
  }, []);

  const handlePause = useCallback(() => {
    playerRef.current?.pause();
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
    setPhase("watching");
    onChoose(c);
  };

  const handleContinue = () => {
    if (choice) onContinue(choice);
  };

  const handleSkip = () => {
    if (choice) onContinue(choice);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-border bg-card">
      <div className="relative" style={{ aspectRatio: "9 / 16", maxHeight: "600px" }}>
        <div ref={containerRef} className="absolute inset-0 w-full h-full [&>iframe]:!w-full [&>iframe]:!h-full [&>iframe]:!absolute [&>iframe]:!inset-0" />

        {/* Play button overlay */}
        {!playing && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity hover:bg-black/30"
            aria-label={t("Play video", "Reproducir video")}
          >
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-primary/60 animate-[ping_2s_ease-out_infinite]" />
              <div className="absolute inset-[-4px] rounded-full border border-primary/30 animate-[spin_8s_linear_infinite]"
                style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
              <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-110 transition-transform relative z-10">
                <Play className="w-9 h-9 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
            <span className="mt-4 text-white text-sm font-medium">
              {t("Tap to Play", "Toca para Reproducir")}
            </span>
          </button>
        )}

        {/* Pause button — top left when playing */}
        {playing && (
          <button
            onClick={handlePause}
            className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-sm px-3 py-2 text-white hover:bg-black/80 transition-colors"
            aria-label={t("Pause video", "Pausar video")}
          >
            <Pause className="w-5 h-5" />
            <span className="text-xs font-medium">{t("Pause", "Pausar")}</span>
          </button>
        )}

        {/* Sound toggle */}
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

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-6 px-5">

            {/* Phase: intro — show choice buttons */}
            {phase === "intro" && (
              <>
                <p className="text-white/80 text-sm mb-4 text-center font-medium">
                  {t("How can we help you today?", "¿Cómo podemos ayudarle hoy?")}
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleChoice("quote")}
                    className="flex items-center gap-3 w-full rounded-xl px-4 py-3.5 text-left text-sm font-semibold bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/10 transition-all duration-300"
                  >
                    <Wrench className="w-5 h-5 shrink-0" />
                    {t("I Need a Dent Repaired", "Necesito Reparar una Abolladura")}
                  </button>
                  <button
                    onClick={() => handleChoice("training")}
                    className="flex items-center gap-3 w-full rounded-xl px-4 py-3.5 text-left text-sm font-semibold bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/10 transition-all duration-300"
                  >
                    <Award className="w-5 h-5 shrink-0" />
                    {t("I Want to Learn PDR", "Quiero Aprender PDR")}
                  </button>
                </div>
              </>
            )}

            {/* Phase: watching — show guide text + Continue/Skip */}
            {(phase === "watching" || phase === "ready") && (
              <div className="flex flex-col gap-3">
                <p className="text-white/80 text-sm text-center font-medium">
                  {phase === "watching"
                    ? t("Watch this quick 15–30 sec guide, then continue", "Mire esta guía rápida de 15–30 seg, luego continúe")
                    : t("Ready to continue?", "¿Listo para continuar?")}
                </p>
                <button
                  onClick={handleContinue}
                  className="flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3.5 text-sm font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110 transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                  {t("Continue", "Continuar")}
                </button>
                {phase === "watching" && (
                  <button
                    onClick={handleSkip}
                    className="flex items-center justify-center gap-2 w-full rounded-xl px-3 py-2.5 text-xs font-medium text-white/60 hover:text-white/90 transition-colors"
                  >
                    <SkipForward className="w-4 h-4" />
                    {t("Skip", "Saltar")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
