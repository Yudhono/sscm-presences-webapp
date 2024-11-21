// page.tsx
import Link from "next/link";
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
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4 bg-white shadow">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">AI Assistant</h1>
        </div>
      </nav>

      <main>
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Your Intelligent Programming Assistant
            </h2>
            <h1>
              <Link href="https://sscm-presences-webapp.vercel.app/">
                https://sscm-presences-webapp.vercel.app/
              </Link>
            </h1>
            <p className="text-xl mb-8">Powered by Claude 3.5 Sonnet</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} AI Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
