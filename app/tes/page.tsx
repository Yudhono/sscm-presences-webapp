// page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";

const LandingPage: FC = () => {
  const features = [
    {
      title: "Code Analysis",
      description: "Explain and review code in your editor",
    },
    {
      title: "Code Generation",
      description: "Scaffold new projects and files",
    },
    { title: "Testing", description: "Generate and fix unit tests" },
    {
      title: "Terminal Support",
      description: "Help with commands and explanations",
    },
  ];

  

  return (
    redirect("myapp://sscm-presences-webapp.vercel.app/")
  )
};

export default LandingPage;
