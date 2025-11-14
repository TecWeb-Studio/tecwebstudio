"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Force detection to run after hydration
    if (!i18n.isInitialized) {
      i18n.on("initialized", () => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
