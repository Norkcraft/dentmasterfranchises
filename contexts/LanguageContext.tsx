import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "es";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (en: string, es: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "es" || urlLang === "en") {
        setLangState(urlLang);
        return;
      }

      const stored = localStorage.getItem("dmf-lang");
      setLangState(stored === "es" ? "es" : "en");
    } catch {
      setLangState("en");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("dmf-lang", l);
      // Optional: Update URL without reload to reflect choice? 
      // For now, we keep the URL clean unless explicitly navigating to ?lang=es
      // But if we want SEO persistence, we might want to pushState. 
      // Let's keep it simple for now: this context handles the *initial* load correctly.
    } catch {
      void 0;
    }
  };

  const t = (en: string, es: string) => (lang === "es" ? es : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
