"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function BodyRouteClass() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      document.body.classList.add("home-page");
      document.body.classList.remove("bg-warm-white");
    } else {
      document.body.classList.remove("home-page");
      document.body.classList.add("bg-warm-white");
    }
  }, [pathname]);

  return null;
}
