import Hero from "@/components/Hero";

import SocialProof from "@/components/SocialProof";

import FunStats from "@/components/FunStats";

import BoothOptions from "@/components/BoothOptions";

import Services from "@/components/Services";

import Gallery from "@/components/Gallery";

import Experience from "@/components/Experience";

import CTA from "@/components/CTA";

import Contact from "@/components/Contact";

import Footer from "@/components/Footer";

import ScrollReveal from "@/components/ScrollReveal";



export default function Home() {

  return (

    <>

      <main>

        <Hero />

        <SocialProof />

        <FunStats />

        <ScrollReveal>

          <BoothOptions />

        </ScrollReveal>

        <ScrollReveal delay={100}>

          <Services />

        </ScrollReveal>

        <ScrollReveal delay={100}>

          <Gallery />

        </ScrollReveal>

        <ScrollReveal delay={100}>

          <Experience />

        </ScrollReveal>

        <ScrollReveal>

          <CTA />

        </ScrollReveal>

        <ScrollReveal>

          <Contact />

        </ScrollReveal>

      </main>

      <Footer />

    </>

  );

}


