"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CinematicIntro } from "@/components/motion/CinematicIntro";

const INTRO_KEY = "jsre-intro-seen";

export function IntroGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [introActive, setIntroActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(INTRO_KEY);
    const shouldIntro = pathname === "/" && !seen && !prefersReduced;

    setIntroActive(shouldIntro);
    setReady(true);

    if (shouldIntro) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [pathname]);

  const completeIntro = () => {
    sessionStorage.setItem(INTRO_KEY, "true");
    setIntroActive(false);
    document.body.style.overflow = "";
  };

  if (!ready) {
    return <div className="fixed inset-0 z-[200] bg-black" aria-hidden="true" />;
  }

  return (
    <>
      {introActive && <CinematicIntro onComplete={completeIntro} />}
      {!introActive && children}
    </>
  );
}
