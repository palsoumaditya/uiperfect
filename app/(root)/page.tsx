import Image from "next/image";
import HeroSection from "@/components/landing-Page/hero";
import AIInput_01 from "@/components/uiperfect-ui/ai-input/ai-input-01";
import AIInput_02 from "@/components/uiperfect-ui/ai-input/ai-input-02";
import AIInput_03 from "@/components/uiperfect-ui/ai-input/ai-input-03";
import AIInput_04 from "@/components/uiperfect-ui/ai-input/ai-input-04";
export default function Home() {
  return (
    <main className="bg-white dark:bg-black/5 overflow-x-hidden">
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen px-6 lg:px-4 gap-4 sm:gap-12">
        <HeroSection />
        <AIInput_01 />
        <AIInput_02/>
        <AIInput_03/>
        <AIInput_04/>
      </div>
    </main>
  );
}
