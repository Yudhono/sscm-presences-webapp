"use client";
import { CardWithForm } from "@/src/components/ui/cardWithForm";

export default function Home() {
  return (
    <main className="h-100% flex h-[100%] min-h-screen w-[100%] min-w-[375px] flex-col items-center justify-start gap-4 bg-gradient-to-r from-sky-400 to-blue-500 px-5 pb-5 pt-24 sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[500px] 2xl:w-[500px]">
      <CardWithForm />
      <p className="text-center text-xs font-medium text-gray-300 bottom-0 last:mt-auto">
        Copyright Save Street Child Malang Internal Dev Team
      </p>
    </main>
  );
}
