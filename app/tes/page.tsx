'use client'// page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";

const LandingPage: FC = () => {
  useEffect(() => {
    // Replace this with your app's Play Store link
    const playStoreLink =
      "https://play.google.com/store/apps/details?id=hk.telin.m21";

    // Redirect to Play Store after a delay (optional)
    window.location.href = playStoreLink;
  }, []);
  return redirect("myapp://sscm-presences-webapp.vercel.app/");
};

export default LandingPage;
