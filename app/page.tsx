"use client";
import { CardWithForm } from "@/src/components/ui/cardWithForm";

export default function Home() {
  return (
    <main className="h-100% flex h-[100%] min-h-screen w-[100%] min-w-[375px] flex-col items-center justify-start gap-4 bg-[#FDFDFD] px-5 pb-5 pt-12 sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[500px] xl:pt-[18rem] 2xl:w-[500px] ">
      <CardWithForm />
    </main>
  );
}
