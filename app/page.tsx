import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Business from "./components/home/Business";
import Approach from "./components/home/Approach";
import WorksHighlight from "./components/home/WorksHighlight";
import Mission from "./components/home/Mission";
import Process from "./components/home/Process";
import ContactCta from "./components/home/ContactCta";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="pt-14 md:pt-16">
        <Hero />
        <Business />
        <Approach />
        <WorksHighlight />
        <Mission />
        <Process />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
