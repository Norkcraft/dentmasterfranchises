import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Wrench, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VideoAssistantProps {
  onChoose: (choice: "quote" | "training") => void;
}

const VIMEO_PARAMS = "dnt=1&title=0&byline=0&portrait=0&loop=1&autopause=0&controls=0&background=0";

const videos = {
  intro: `https://player.vimeo.com/video/1164392249?${VIMEO_PARAMS}`,
  quote: `https://player.vimeo.com/video/1164392384?${VIMEO_PARAMS}&autoplay=1&muted=1`,
  training: `https://player.vimeo.com/video/1164392428?${VIMEO_PARAMS}&autoplay=1&muted=1`,
};

export default function VideoAssistant({ onChoose }: VideoAssistantProps) {
  const { t } = useLanguage();
  const [choice, setChoice] = useState<null | "quote" | "training">(null);
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentSrc = choice === "quote" ? videos.quote : choice === "training" ? videos.training : videos.intro;

  // Post message to Vimeo to mute/unmute
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ method: muted ? "setVolume" : "setVolume", value: muted ? 0 : 1 }),
        "*"
      );
    }
  }, [muted]);

  const handleChoice = (c: "quote" | "training") => {
    setChoice(c);
    onChoose(c);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-border bg-card">
      {/* Portrait video container */}
      <div className="relative" style={{ aspectRatio: "9 / 16", maxHeight: "600px" }}>
        <iframe
          ref={iframeRef}
          src={currentSrc}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Dent Master Introduction"
        />

        {/* Mute toggle */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

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
