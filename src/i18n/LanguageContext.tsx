import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { portfolioContent } from "./portfolioContent";

export type Language = "en" | "es";

const STORAGE_KEY = "pipboy-portfolio-language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  content: (typeof portfolioContent)[Language];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function setMetaContent(selector: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", value);
}

function getInitialLanguage(): Language {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const content = portfolioContent[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content.seo.title;
    setMetaContent('meta[name="description"]', content.seo.description);
    setMetaContent('meta[property="og:title"]', content.seo.title);
    setMetaContent('meta[property="og:description"]', content.seo.description);
    setMetaContent('meta[property="og:image:alt"]', content.seo.imageAlt);
    setMetaContent('meta[property="og:locale"]', content.seo.locale);
    setMetaContent(
      'meta[property="og:locale:alternate"]',
      content.seo.alternateLocale,
    );
    setMetaContent('meta[name="twitter:title"]', content.seo.title);
    setMetaContent('meta[name="twitter:description"]', content.seo.description);
    setMetaContent('meta[name="twitter:image:alt"]', content.seo.imageAlt);

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The interface still works when storage is unavailable.
    }
  }, [content.seo, language]);

  const value = useMemo(
    () => ({ language, setLanguage, content }),
    [content, language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
