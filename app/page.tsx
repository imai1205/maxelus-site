import Footer from "./components/Footer";
import LenisRoot from "./components/LenisRoot";
import { HeroScrollScene } from "@/components/effects/hero-scroll-scene";
import Business from "./components/home/Business";
import Approach from "./components/home/Approach";
import WorksHighlight from "./components/home/WorksHighlight";
import Mission from "./components/home/Mission";
import Process from "./components/home/Process";
import ContactCta from "./components/home/ContactCta";

// トップのみダーク基調 + スクロール連動背景 (HeroScrollScene が fixed canvas を敷く)
export default function Home() {
  return (
    <LenisRoot>
      <div className="min-h-screen font-sans">
        <main>
          <HeroScrollScene />
          <Business />
          <Approach />
          <WorksHighlight />
          <Mission />
          <Process />
          <ContactCta />
        </main>
        <Footer />
      </div>
    </LenisRoot>
  );
}
