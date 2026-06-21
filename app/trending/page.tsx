"use client";

import { useEffect } from "react";

export default function TrendingPage() {
  useEffect(() => {
    window.location.replace("/#trending");
  }, []);

  return null;
}
