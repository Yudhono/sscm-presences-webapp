'use client'// page.tsx
// import Link from "next/link";
// import { redirect } from "next/navigation";
import { FC, useEffect } from "react";

const LandingPage: FC = () => {
  useEffect(() => {
    const deepLinkUrl = "myapp://sscm-presences-webapp.vercel.app/";
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=hk.telin.m21";

    const openApp = () => {
      window.location.href = deepLinkUrl;

      setTimeout(() => {
        window.location.href = playStoreUrl;
      }, 2000); // Adjust the timeout as needed
    };

    openApp();
  }, []);
  return <h1>Redirecting...</h1>;
};

export default LandingPage;
